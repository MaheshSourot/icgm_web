import { Component } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { UserService } from '../service/user.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay } from 'rxjs';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnInit {

  public chartOptions1: any
  public chartOptions2: any
  public chartOptions3: any
  public chartOptions4: any
  chartOptions: any;

ngOnInit(): void {
  
  this.getDashBoardCount()
  this.getCompostionClaim()
  this.getDistributeTask()
  this.getMonthlyWiseClaim()
  this.getAverageDaysClaim()
  this.getTopUserClaim()
  this.getRevenueClaim()
}

 constructor(private srv: UserService, private router:Router) {

  this.chartOptions1 = {
    series: [
      {
        name: 'Series 1',
        data: [],
      },
      {
        name: 'Series 2',
        data: [],
      },
    ],
    chart: {
      type: 'bar',
      height: 450,
    },

    plotOptions: {
      bar: {
        horizontal: true,
         // Makes the bar chart horizontal
      },
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      // title: {
      //   text: 'Values',
      // },
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    // title: {
    //   text: 'Number of Claims & Inspections Initiated Each Month',
    // },
    dataLabels: {
      enabled: true,
      position:'top'
    },
  };

  this.chartOptions2 = {
    series: [
      {
        name: 'Data',
        data: [],
      },
    ],
    chart: {
      type: 'bar',  // Set the chart type to bar
      height: 400,
    },
    plotOptions: {
      bar: {
        horizontal: true, // Makes the bar chart horizontal
      },
    },
    yaxis: {
      categories: [],
      // title: {
      //   text: 'Values',
      // },
    },
    xaxis: {
      title: {
        text: 'Categories',
      },
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: 'Avg. Days to Settle a Claim',
      align: 'center',
    },
  };

  this.chartOptions3 = {
    series: [
      {
        name: 'Data',
        data: [],
      },
    ],
    chart: {
      type: 'bar',  // Set the chart type to bar
      height: 400,
    },
    plotOptions: {
      bar: {
        horizontal: true, // Makes the bar chart horizontal
      },
    },
    yaxis: {
      categories: [],
      // title: {
      //   text: 'Values',
      // },
    },
    xaxis: {
      title: {
        text: 'Categories',
      },
    },
    dataLabels: {
      enabled: true,
    },
    // title: {
    //   text: 'Top 10 Users by Activity',
    //   align: 'left',
    // },
  };




  this.chartOptions4 = {
    chart: {
      type: 'line',
      height: 400,
      
    },
    series: [
      {
        name: 'New Clients Registered',
        type: '',
        data:[]
      },
      {
        name: 'Revenue',
        type: 'bar',
        
        data:[],
        

      }
    ],
    stroke: {
      width: [0, 6]
    },
    // title: {
    //   text: 'Monthly Revenue and New Clients Registered',
      
    // },
    xaxis: {
         categories:[]
    },
    yaxis: [
      {
        title: {
          text: 'New Clients Registered'
        }
      },
      {
        opposite: true,
        title: {
          text: 'Revenue'
        }
      }
    ],
    dataLabels: {
      enabled: true
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    markers: {
      size: [0, 4]
    },
  
  };
    
  

 }

 onRegisration()
 {
  this.router.navigateByUrl('/add-user')
 }

 onInitiateNewProcess()
 {
  this.router.navigateByUrl('calen')
 }

dashBoard:any
dashBoardObject:any
mostActiveUser:any
userKeys:any[]=[]
userKeysArray:string[]=[]
userValues:any
client_names:any


getDashBoardCount()
{

  this.srv.getDashBoardCounter().subscribe((res)=>
  {
    console.log(res);
    this.dashBoard=res
    this.dashBoardObject=this.dashBoard.value
    // console.log(this.dashBoardObject);
    this.userValues=Object.values(this.dashBoardObject)
    // console.log(this.userValues);
    this.mostActiveUser=this.userValues.splice(4,1)
    this.userKeys=Object.keys(this.dashBoardObject)
    this.userKeys.splice(4,1)
    
    this.userKeys.map((item:string)=>{
    this.userKeysArray.push(item.split('_').join(' '));
    });
    console.log(this.userKeysArray);
    
    this.client_names= this.mostActiveUser[0].client_names
    // console.log(this.mostActiveUser[0].client_names);
  })
}
compostionClaimObject:any
compostionClaimArray:any

productName:any[]=[]
getCompostionClaim()
{
  this.srv.getComposition().subscribe((res)=>
  {
    console.log(res);
    this.compostionClaimObject=res
    this.compostionClaimArray=this.compostionClaimObject.value
    this.compostionClaimArray.map((res:any)=>
    {
      this.productName.push(res.product_name)
    })
    console.log(this.productName);
    
   
  })
}


getDistributeTask()
{
  this.srv.getDistribute().subscribe((res:any)=>
  {
    const apiData=res.value
    const chartLabels=apiData.labels
    const chartSeries=apiData.series
    const chartColor=apiData.colors

    // console.log(apiData);
    // console.log(chartLabels);
    // console.log(chartSeries);
    // console.log(chartColor);
    this.createDonutChart(chartLabels, chartSeries,chartColor);
    
    
    })
}

createDonutChart(labels: string[], series: number[],chartColor:string[]) {
  this.chartOptions = {
    series: series, // API data for chart values
    chart: {
      type: 'donut'
    },

    
    
    labels: labels, // API data for chart labels
    colors: chartColor, // Customize colors
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true
            }
          }

        }
      }
    },
    
    dataLabels: {
      enabled: true
    },

    
  };
}


getMonthlyWiseClaim()
{
  this.srv.getMonthlyWise().subscribe((res:any)=>
  {
  console.log(res);
  const apiData=res.value
  const categories :string[]=apiData.categories
  const categoriesData:any[]=[]
  categories.map((value,index)=>
  {
    categoriesData.push(value.slice(0,3))
  });
  console.log(categoriesData);
  const series=apiData.series
  const name1=apiData.series[0].name
  console.log(name1);
  const seriesData1=apiData.series[0].data
  console.log(seriesData1);
  const name2=apiData.series[1].name
  console.log(name2);
  const seriesData2=apiData.series[1].data
  console.log(seriesData2);

  this.chartOptions1 = {
    ...this.chartOptions1,
    series: [
      { name: name1, data: seriesData1 },
      { name: name2, data: seriesData2 },
    ],
    xaxis: { categories: categoriesData },
  };

  })
}

dataStored:any[]=[]
category:any[]=[]
getAverageDaysClaim()
{
  this.srv.getAverageDays().subscribe((res:any)=>
  {
    // console.log(res);
    // console.log(res.value)
    this.dataStored.push(res.value[0].data[0])
    this.dataStored.push(res.value[1].data[0])

    const name1=res.value[0].name
    console.log(this.dataStored);
    this.category.push(res.value[0].product_name)
    this.category.push(res.value[1].product_name)
    console.log(this.category);
   

    this.chartOptions2 = {
      ...this.chartOptions2,
      series: [
        {
          name: name1,
          data: this.dataStored
        },
      ],
      xaxis: {
        categories:this.category,
      },
    };
  })
}

getTopUserClaim()
{
  this.srv.getTopUser().subscribe((res:any)=>
  {
    console.log(res.value);
    const name1=res.value[0].name
    console.log(name1);
    const dataArray=res.value[0].data;
    const nameData=res.value[0].user_name;

    this.chartOptions3 = {
      ...this.chartOptions3,
      series: [
        {
          name: name1,
          data: dataArray
        },
      ],
      xaxis: {
        categories:nameData,
      },
    };
  })
}


getRevenueClaim()
{
  this.srv.getRevenue().subscribe((res:any)=>
{
  console.log(res.value);
  const name=res.value.name
  const data1=res.value.data
  console.log(data1);
  const month=res.value.months
  const year=res.value.years

  this.chartOptions4 = {
    ...this.chartOptions4,
    series: [
      
      { name: 'New Clients Registered', data:[0,0,0,0,0,0,0,...data1,0,0],type:'bar'  },
      { name: 'Revenue', data:[0,0,0,0,0,0,0,0,0,0,0,0] ,color:'orange',type:'line' }
    ],
    xaxis: { categories: ['Jan','Feb','Mar','Arp','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
  };
  
})
}

}
