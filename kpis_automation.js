import Chart from 'chart.js/auto'

  //(async function() {
    const data = [
      { year: "Y1", manual: 0, testim: 0 },
      { year: "Y2", manual: 0, testim: 0 },
      { year: "Y3", manual: 0, testim: 0 },
    ];
  
    const ctx = document.getElementById('kpis_automation').getContext("2d");
  
    const myChart = new Chart(
      ctx,
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Coded Solution Cost',
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


    document.getElementById('zz_AnnualSalaryDEV').value = parseFloat(this.z_AnnualSalaryDEV.value).toLocaleString();
    document.getElementById('t_timeForE2ETest').value = this.timeForE2ETest.value;
    document.getElementById('totalNumOfAutomatedTests').value = parseInt(this.z_NumOfTestsReg.value) + parseInt(this.z_NumOfTestsSmoke.value);
    document.getElementById('totalNumOfAutomatedTests2').value = parseInt(this.z_NumOfTestsReg.value) + parseInt(this.z_NumOfTestsSmoke.value);
    document.getElementById('t_MaintenanceManual').value = this.timeToMaintain.value;
    document.getElementById('t_annualSalary').value = parseFloat(this.z_AnnualSalaryDEV.value).toLocaleString();
    document.getElementById('t_annualSalary2').value = parseFloat(this.z_AnnualSalaryDEV.value).toLocaleString();
    document.getElementById('t_numberOfAutomationEng').value = this.numOfAutomationEngineers.value;
    document.getElementById('t_numberOfAutomationEng2').value = this.numOfAutomationEngineers.value;
    document.getElementById('t_MaintenanceTestim').value = 6;
    document.getElementById('zz_TestimLicense').value = parseFloat(this.z_TestimLicense.value).toLocaleString();
    

    //calculated items
    document.getElementById('z_HourlySalaryDEV').value = parseFloat(this.z_AnnualSalaryDEV.value / parseInt(1920)).toLocaleString();
    document.getElementById('z_HourlySalaryDEV2').value = parseFloat(this.z_AnnualSalaryDEV.value / parseInt(1920)).toLocaleString();
    document.getElementById('totalAnnualCostManual').value = parseFloat(this.timeForE2ETest.value * document.getElementById('totalNumOfAutomatedTests').value * document.getElementById('z_HourlySalaryDEV').value).toLocaleString();
    document.getElementById('totalAnnualCostTestim').value = parseFloat(1 * document.getElementById('totalNumOfAutomatedTests2').value * document.getElementById('z_HourlySalaryDEV').value).toLocaleString();

    let savingsPerYearAutomation = parseFloat(this.timeForE2ETest.value * document.getElementById('totalNumOfAutomatedTests').value * document.getElementById('z_HourlySalaryDEV').value) - parseFloat(1 * document.getElementById('totalNumOfAutomatedTests2').value * document.getElementById('z_HourlySalaryDEV').value)
    document.getElementById('savingsPerYearAutomation').value = "$" + savingsPerYearAutomation.toLocaleString();

    let _ANNUAL_MAINTENANCE_CODED = this.z_AnnualSalaryDEV.value * this.timeToMaintain.value / 100;
    document.getElementById('annualMaintenanceAutomation').value = (_ANNUAL_MAINTENANCE_CODED * this.numOfAutomationEngineers.value).toLocaleString();

    let _ANNUAL_MAINTENANCE_TESTIM = this.z_AnnualSalaryDEV.value * 6 / 100;
    document.getElementById('annualMaintenanceTestim').value = (_ANNUAL_MAINTENANCE_TESTIM * this.numOfAutomationEngineers.value).toLocaleString();

    document.getElementById('savingsPerYearMaint').value = "$" + ((_ANNUAL_MAINTENANCE_CODED * this.numOfAutomationEngineers.value) - (_ANNUAL_MAINTENANCE_TESTIM * this.numOfAutomationEngineers.value)).toLocaleString();
  
    document.getElementById('z_TotalAnnualCodedCost').value = (parseFloat(this.timeForE2ETest.value * document.getElementById('totalNumOfAutomatedTests').value * document.getElementById('z_HourlySalaryDEV').value) + (_ANNUAL_MAINTENANCE_CODED * this.numOfAutomationEngineers.value)).toLocaleString();
    document.getElementById('z_TotalAnnualTestimCost').value = (parseFloat(1 * document.getElementById('totalNumOfAutomatedTests2').value * document.getElementById('z_HourlySalaryDEV').value) + (_ANNUAL_MAINTENANCE_TESTIM * this.numOfAutomationEngineers.value) + parseFloat(this.z_TestimLicense.value)).toLocaleString();
    
    document.getElementById('totalSavingsPerYear').value = "$" + (savingsPerYearAutomation + ((_ANNUAL_MAINTENANCE_CODED * this.numOfAutomationEngineers.value) - (_ANNUAL_MAINTENANCE_TESTIM * this.numOfAutomationEngineers.value) - parseFloat(this.z_TestimLicense.value))).toLocaleString();
  

    let year2 = parseInt(this.z_NumOfTestsReg.value) + parseInt(this.z_NumOfTestsSmoke.value) + parseInt(50);
    let year3 = parseInt(this.z_NumOfTestsReg.value) + parseInt(this.z_NumOfTestsSmoke.value) + parseInt(100);

    let _annualCostCodedY2 = (parseFloat(this.timeForE2ETest.value * year2 * document.getElementById('z_HourlySalaryDEV').value) + (_ANNUAL_MAINTENANCE_CODED * this.numOfAutomationEngineers.value));
    let _annualCostCodedY3 = (parseFloat(this.timeForE2ETest.value * year3 * document.getElementById('z_HourlySalaryDEV').value) + (_ANNUAL_MAINTENANCE_CODED * this.numOfAutomationEngineers.value));
    
    let _MONTHLY_CODED_COST = (parseFloat(document.getElementById('z_TotalAnnualCodedCost').value) / 12);
    document.getElementById('ROIinMonths').value = (parseFloat(document.getElementById('z_TotalAnnualTestimCost').value) / _MONTHLY_CODED_COST).toLocaleString();

    myChart.data.datasets[0].data[0] = (parseFloat(this.timeForE2ETest.value * document.getElementById('totalNumOfAutomatedTests').value * document.getElementById('z_HourlySalaryDEV').value) + (_ANNUAL_MAINTENANCE_CODED * this.numOfAutomationEngineers.value));
    myChart.data.datasets[1].data[0] = (parseFloat(1 * document.getElementById('totalNumOfAutomatedTests2').value * document.getElementById('z_HourlySalaryDEV').value) + (_ANNUAL_MAINTENANCE_TESTIM * this.numOfAutomationEngineers.value) + parseFloat(this.z_TestimLicense.value));
    myChart.data.datasets[0].data[1] = _annualCostCodedY2;
    myChart.data.datasets[1].data[1] = (parseFloat(1 * year2 * document.getElementById('z_HourlySalaryDEV').value) + (_ANNUAL_MAINTENANCE_TESTIM * this.numOfAutomationEngineers.value) + parseFloat(this.z_TestimLicense.value));
    myChart.data.datasets[0].data[2] = _annualCostCodedY3
    myChart.data.datasets[1].data[2] = (parseFloat(1 * year3 * document.getElementById('z_HourlySalaryDEV').value) + (_ANNUAL_MAINTENANCE_TESTIM * this.numOfAutomationEngineers.value) + parseFloat(this.z_TestimLicense.value));
    myChart.update();

  }

  window.addEventListener('load', getValues);


