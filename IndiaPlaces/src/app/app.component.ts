import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public allStateData = [];
  public allStateNames = [];
  public allDistrictData = [];
  public districtDetails;
  public isStates= true;
  public isDistricts= false;
  public isDistricDetails= false;
  public districName = '';
  public selectedStateName = '';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getStateDetails();
  }

  getStatesAndUnionTerritories(): Observable<any> {
    return this.http.get<any>('../assets/stateList.json');
  }

  public getStateDetails() {
    this.getStatesAndUnionTerritories().subscribe((states) => {
      const stateObj = states;
      const stateList = Object.entries(stateObj).map((e) => ({ [e[0]]: e[1] }));
      stateList.map((item) => {
        item.stateName = Object.keys(item);
      });
      this.allStateData = stateList;
    });
  }
  public stateName(state) {
    this.selectedStateName = state.stateName[0];
    this.isStates= false;
    this.isDistricts= true;
    this.isDistricDetails= false;
    let districtObj;
    for (let key in state) {
      if (state[key].districtData) {
        districtObj = state[key].districtData;
      }
    }
    const disTricList = Object.entries(districtObj).map((e) => ({
      [e[0]]: e[1],
    }));
    disTricList.map((item) => {
      item.districtName = Object.keys(item);
    });
    this.allDistrictData = disTricList;
  }

  public districtNames(district) {
    this.districName = district.districtName[0];
    this.isStates= false;
    this.isDistricts= false;
    this.isDistricDetails= true;
    for (let key in district) {
      if (district.districtName[0] === key) {
        this.districtDetails = district[key];
      }
    }
  }

  public backToStates(){
    this.isStates= true;
    this.isDistricts= false;
    this.isDistricDetails= false;
  }
  public backToDistricts(){
    this.isStates= false;
    this.isDistricts= true;
    this.isDistricDetails= false;
  }

}
