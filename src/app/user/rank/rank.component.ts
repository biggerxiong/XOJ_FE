import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Page } from 'src/app/model/http/page';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  rankList: User[] = []
  pageSizeOptions = [10, 30, 50, 100]
  pageResult: Page = new Page()
  loading: boolean = true
  rows: number = 10
  page: number = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

    var rankListObservable = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("page"))
          this.page = +params.get("page")
        else
          this.page = 0
        if (params.has("rows"))
          this.rows = +params.get("rows")
        else 
          this.rows = 10
        return this.userService.getRankList(this.page, this.rows)
      })
    )

    rankListObservable.subscribe(result => {
      this.pageResult = result.data
      this.pageResult.number = this.pageResult.number + 1
      this.rankList = this.pageResult.content
      console.log("rankList: ", this.rankList)
      this.loading = false
    })
  }

  getPercent(accept: number, submit: number): string {
    var str = Number(accept/submit*100).toFixed(2);
    str += "%";
    return str;
  }

  onPageSizeChange(event) {
    console.log("event: ", event)
    this.rows = event
    this.loading = true
    this.refreshData()
  }

  onPageIndexChange(event) {
    this.page = event - 1
    this.loading = true
    this.refreshData()
  }

  refreshData() {
    this.router.navigate(['/user/rank', { page: this.page, rows: this.rows }])
  }

}
