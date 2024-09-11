import Chart from 'chart.js/auto'

  //(async function() {
    const data = [
      { year: "Y1", manual: 0, testim: 0 },
      { year: "Y2", manual: 0, testim: 0 },
      { year: "Y3", manual: 0, testim: 0 },
    ];
  
    const ctx = document.getElementById('kpis').getContext("2d");
  
    const myChart = new Chart(
      ctx,
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Manual Testing Cost',
              data: data.map(row => row.manual),
              backgroundColor: '#FA5F5580',
            },
            {
              label: 'Testim Automation Cost',
              data: data.map(row => row.testim),
              backgroundColor: '#2AAA8A80',
            }
          ]
        },
        options: {
          layout: {
            padding: {
                left: 60
            }
        },
          plugins: {
              title: {
                  display: true,
                  text: 'Annual Costs & Projected Savings',
                  font: {
                    size: 14
                  },
                  padding: {
                      bottom: 5
                  }
              },
              subtitle: {
                display: true,
                text: '(Assuming 50 E2E test cases increase YoY)',
                  padding: {
                      bottom: 20
                  }
            },
            tooltip: {
              callbacks: {
                  label: function(context) {
                      let label = context.dataset.label || '';

                      if (label) {
                          label += ': ';
                      }
                      if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                      }
                      return label;
                  }
              }
          }
          },
          scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        //return '$' + value;
                        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                    }
                }
            }
        }
      }
      }
    );



  let form = document.forms["myForm"];
  form.addEventListener("submit", getValues);

  function getValues(event){
    event.preventDefault();

    document.getElementById('zz_NumOfTestsReg').value = this.z_NumOfTestsReg.value;
    document.getElementById('zz_NumOfTestsSmoke').value = this.z_NumOfTestsSmoke.value;
    document.getElementById('zz_TimeToCompleteManualTest').value = this.z_TimeToCompleteManualTest.value;
    document.getElementById('zz_ManualRegPerDay').value = this.z_ManualRegPerDay.value;
    document.getElementById('zz_ManualSmokePerDay').value = this.z_ManualSmokePerDay.value;
    document.getElementById('zz_NumOfBrowsersReg').value = this.z_NumOfBrowsersReg.value;
    document.getElementById('zz_NumOfBrowsersSmoke').value = this.z_NumOfBrowsersSmoke.value;
    document.getElementById('zz_AnnualSalaryManualQA').value = parseFloat(this.z_AnnualSalaryManualQA.value).toLocaleString();
    document.getElementById('zz_TestimLicense').value = parseFloat(this.z_TestimLicense.value).toLocaleString();
    document.getElementById('z_TotalAnnualTestimCost').value = parseFloat(this.z_TestimLicense.value).toLocaleString();
    

    //calculated items
    document.getElementById('z_NumOfPeopleToCompleteManualReg').value = ((1 * this.z_NumOfTestsReg.value * this.z_TimeToCompleteManualTest.value * this.z_ManualRegPerDay.value * this.z_NumOfBrowsersReg.value) / 480).toLocaleString(); //min in 8hr working day
    document.getElementById('z_NumOfPeopleToCompleteManualSmoke').value = ((1 * this.z_NumOfTestsSmoke.value * this.z_TimeToCompleteManualTest.value * this.z_ManualSmokePerDay.value * this.z_NumOfBrowsersSmoke.value) / 480).toLocaleString(); //min in 8hr working day
    document.getElementById('z_TotalNumOfPeopleRequired').value = (parseFloat(document.getElementById('z_NumOfPeopleToCompleteManualReg').value) + parseFloat(document.getElementById('z_NumOfPeopleToCompleteManualSmoke').value)).toLocaleString();
    document.getElementById('z_TotalAnnualManualCost').value = parseFloat(document.getElementById('z_TotalNumOfPeopleRequired').value * this.z_AnnualSalaryManualQA.value).toLocaleString();
    let _TOTAL_SAVINGS = parseFloat(document.getElementById('z_TotalNumOfPeopleRequired').value * this.z_AnnualSalaryManualQA.value) - parseFloat(this.z_TestimLicense.value);
    document.getElementById('totalSavingsPerYear').value = _TOTAL_SAVINGS.toLocaleString();
    let _MONTHLY_MANUAL_COST = (parseFloat(document.getElementById('z_TotalAnnualManualCost').value) / 12);
    document.getElementById('ROIinMonths').value = (parseFloat(document.getElementById('zz_TestimLicense').value) / _MONTHLY_MANUAL_COST).toLocaleString();
    

    let year2 = parseInt(this.z_NumOfTestsReg.value) + parseInt(50);
    let year3 = parseInt(this.z_NumOfTestsReg.value) + parseInt(100);

    let _NUM_OF_PEOPLE_REQUIRED_REG_Y2 = parseFloat((1 * year2 * this.z_TimeToCompleteManualTest.value * this.z_ManualRegPerDay.value * this.z_NumOfBrowsersReg.value) / 480);
    let _TOT_NUM_OF_PEOPLE_REQUIRED_Y2 = _NUM_OF_PEOPLE_REQUIRED_REG_Y2 + parseFloat(document.getElementById('z_NumOfPeopleToCompleteManualSmoke').value);

    let _NUM_OF_PEOPLE_REQUIRED_REG_Y3 = parseFloat((1 * year3 * this.z_TimeToCompleteManualTest.value * this.z_ManualRegPerDay.value * this.z_NumOfBrowsersReg.value) / 480);
    let _TOT_NUM_OF_PEOPLE_REQUIRED_Y3 = _NUM_OF_PEOPLE_REQUIRED_REG_Y3 + parseFloat(document.getElementById('z_NumOfPeopleToCompleteManualSmoke').value);
   
    myChart.data.datasets[0].data[0] = parseFloat(1 * document.getElementById('z_TotalNumOfPeopleRequired').value * this.z_AnnualSalaryManualQA.value);
    myChart.data.datasets[1].data[0] = this.z_TestimLicense.value;
    myChart.data.datasets[0].data[1] = parseFloat(1 * _TOT_NUM_OF_PEOPLE_REQUIRED_Y2 * this.z_AnnualSalaryManualQA.value);
    myChart.data.datasets[1].data[1] = this.z_TestimLicense.value;
    myChart.data.datasets[0].data[2] = parseFloat(1 * _TOT_NUM_OF_PEOPLE_REQUIRED_Y3 * this.z_AnnualSalaryManualQA.value);
    myChart.data.datasets[1].data[2] = this.z_TestimLicense.value;
    myChart.update();

  }

  window.addEventListener('load', getValues);


