import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'village_talkies';
  employee_data : any =[]
  employee_data_1 : any = []
  filterValues : any =[]
  position: any;
  filter:any
  constructor(private httpClient: HttpClient){
    this.getData()
  }

    ngOnInit(): void {
      
    } 
    getData()
    {
      this.httpClient.get("db/db.json").subscribe((data : any) => {
        let arr_emp: any = []
        let arr_man: any = []
        for(let i = 0;i < data.length;i++){
          arr_man = [...arr_man,{'name': data[i]["name"],'post' : data[i]["post"],'team' : data[i]["team"]}]
          for(let j = 0;j < data[i]['child'].length;j++){
            arr_emp = [...arr_emp,{'name': data[i]['child'][j]["name"],'post' : data[i]['child'][j]["post"],'team' : data[i]['child'][j]["team"]}]
          }
        }
        this.employee_data = [...arr_emp,...arr_man];
        this.employee_data_1 = [...arr_emp,...arr_man];
        let temp = this.employee_data.map((data :any) => data.team)
        this.position = temp.filter((data: any,i: any) => temp.indexOf(data) == i)
        console.log(this.employee_data_1)
    })
  }

filterDrop(event: any)
{
    let value = event.value.trim();
    this.employee_data_1 = this.employee_data.filter((data: any) => data.team == value)
  }

search(event: any)
{

  let searchValue = event.value
    if(searchValue == '')
    {
      this.employee_data_1 =  this.employee_data; 
    }
    else if(searchValue  !== '')
    {
      this.employee_data_1 = this.employee_data.filter((data:any) =>
      {
        return data.name.toLocaleLowerCase().substring(0,searchValue.length) == searchValue
      })
      console.log(this.employee_data_1)
    }
}
}






  
  