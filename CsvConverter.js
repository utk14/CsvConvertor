const csv=require('csvtojson')
const lodash = require('lodash');

const csvFilePath='./assignment.csv'

csv()
.fromFile(csvFilePath)
.then((contentObject)=>{
    let groupByContentResult = lodash.chain(contentObject)
                                     .groupBy("content_id")
                                     .toPairs()
                                     .map(function(currentItem) {
                                        return { content_id:  currentItem[0], 
                                                 timeSpent: currentItem[1].reduce((acc,val)=>acc + Number(val.time_spent),0)
                                                }
                                  })
                                     .value();
    let groupByDateResult = lodash.chain(contentObject)
                                  .groupBy("date")
                                  .toPairs()
                                  .map((currItem) => {
                                    return { date:  currItem[0], 
                                             timeSpent: currItem[1].reduce((acc,val)=>acc + Number(val.time_spent),0)
                                           }
                                  })
                                  .value()
    console.log("groupByContentResult",groupByContentResult);
    console.log("groupByDateResult", groupByDateResult)
})