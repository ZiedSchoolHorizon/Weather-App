import { Component, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/services/meteo.service';
@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  div1: any= false; 
  div2: any = false; 
  div3: any = false; 
  ville: any; 
  info: any; 
  weather5: any = [];
  country: any; 
  date: any;
  latitude: any; 
  longtitude: any;
  Humidite: any; 
  Pression: any; 
  Description: any; 
  iconURL: any; 
  temp: any; 
  timezone: any; 
  img_table: any = []; 
  img_tab: any = []; 
  constructor(private meteoService: MeteoService) {}
  ngOnInit(): void {}

  chargerMeteo1jour() {
    this.info = null; 
    this.meteoService.getMeteo1jour(this.ville).subscribe((res) => {
      this.div1= true  
      this.info = res
      this.iconURL = "https://openweathermap.org/img/wn/" + this.info.weather[0].icon + "@2x.png"
      this.temp = this.info.main.temp; 
      this.Description = this.info.weather[0].description; 
      this.latitude = this.info.coord.lat; 
      this.longtitude = this.info.coord.lon; 
      this.Humidite = this.info.main.humidity; 
      this.Pression = this.info.main.pressure;
      this.timezone= this.info.timezone
      this.date = Date(); 
      this.country = this.info.sys.country
      this.div3=false
      console.log(this.info)
    }, (error) => {
      this.iconURL = null
      this.temp =null
      this.Description = null 
      this.latitude = null
      this.longtitude = null; 
      this.Humidite = null; 
      this.Pression = null;
      this.timezone= null
      this.date = null
      this.country = null
      this.div3 = true
      this.div1 = false
    }
    )
  }
  chargerMeteo5jour() {
    this.info = null
    this.meteoService.getMeteo5jour(this.ville).subscribe((res) => {
      this.info = res 
      console.log(this.info)
      for (let i = 0; i < this.info.list.length; i++) {
      this.info.list[i].weather[0].icon = "https://openweathermap.org/img/wn/" + this.info.list[i].weather[0].icon + "@2x.png"
    }
    }, (error) => {
      this.div3 = true
      this.div2=false
    }
    )
  }
  affichage(data: any) {
    for (let i = 0; i < data.list.length; i++) {
      this.weather5.push(data.list[i])
    }
    console.log(this.weather5)
    console.log(this.info)
  }
  showMeteo() {
    if (this.ville) {   
      this.div1 = true; 
      this.div2 = false;
    }
  }
  showMeteo2() {
    if (this.ville) {   
    this.div1 = false;
    this.div2 = true;
    }

  }
  onChangeEvent(event: any) {
    if (event.target.value == "") {
      this.ville = ""
      this.iconURL = null
      this.temp =null
      this.Description = null 
      this.latitude = null
      this.longtitude = null; 
      this.Humidite = null; 
      this.Pression = null;
      this.timezone= null
      this.date = null
      this.country = null
      this.div3 = true
      this.div1 = false
          this.info = null
    this.div3 = false
    this.div2 = false
    this.div1= false
    } else {
      this.ville = event.target.value; 
    this.chargerMeteo1jour(); 
    this.chargerMeteo5jour(); 
    }
  }
  calcTime(offset:any ) {
    var b = new Date(); 
    var utc = b.getTime() + (b.getTimezoneOffset() * 60000)
    var nd = new Date(utc + (360000 * offset))
    return nd.toLocaleString()
  }
}

