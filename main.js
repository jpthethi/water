function distribute(slabs,cons){

  console.log("---------");
  var totalConsumption = cons.reduce(function(a, b){
    return a + b;
  }, 0);
  var tot =  slabs.reduce(function(a, b){
    return a + b[0] * b[1];
  }, 0);
  console.log("consumption "+tot);


  var villas = cons.map((f,i)=>{return {v:i+1,c:f,pay:0}}).sort((a,b)=>a.c>b.c?1:-1);

  while(Math.floor(totalConsumption)>0 && slabs.length>0){
    var next_villas = villas.filter(v=>v.c>0);
    var consume = next_villas[0].c;
    if(slabs[0][0]<=0) {console.log("pop slab");slabs.shift();}
    var current_slab = slabs[0];
    var at_rate = current_slab[1];
    if(current_slab[0]/next_villas.length < consume) {consume = slabs[0][0]/next_villas.length;slabs.shift();};
    //console.log("Book " + consume + " for " + next_villas.length + " houses at rate "+ at_rate);
    next_villas.map(v=>{v.c-=consume;totalConsumption-=consume;v.pay+=consume*at_rate;current_slab[0]-=consume});
  }

  var dist = villas.sort((a,b)=>a.v-b.v).map(v=>Math.round(v.pay,0));
  console.log("total amount " + dist.reduce(function(a, b){ return a + b;}, 0)) ;
  console.log(dist.join(","));
  return dist;
}


function test(a,b,expect){
  var out = distribute(a,b);
  return out.map((item,index)=>expect[index]==item).filter(l=>!l).length==0?"Pass":"Fail";
}

var tr = [];
{
  var slabs = [[100,100]];
  var cons = [10,0,15,20,40];
  var expect = [1000,0,1500,2000,4000];
  tr.push(test(slabs,cons,expect));
}
{
  var slabs = [[0,2100],[85,100]];
  var cons = [10,0,15,20,40];
  var expect = [1000,0,1500,2000,4000];
  tr.push(test(slabs,cons,expect));
}
{
  var slabs = [[0,2100],[25,100],[85,100]];
  var cons = [10,0,15,20,40];
  var expect = [1000,0,1500,2000,4000];
  tr.push(test(slabs,cons,expect));
}
{
  var slabs = [[0,2100],[25,100],[85,100]];
  var cons = [10,0,15,20,40];
  var expect = [1000,0,1500,2000,4000];
  tr.push(test(slabs,cons,expect));
}
{
  var slabs = [[25,100],[20,300],[40,500]];
  var cons = [10,0,15,20,40];
  var expect = [1750,0,3917,6417,16417];
  tr.push(test(slabs,cons,expect));
}

{
  var slabs = [[25,100],[20,300],[40,500]];
  var cons = [10,10,10,20,20];
  var expect = [2200,2200,2200,7200,7200];
  tr.push(test(slabs,cons,expect));
}

{
  var slabs = [[25,100],[20,300],[40,500]];
  var cons = [10.1,9.9,10,20,20];
  var expect = [2250,2150,2200,7200,7200];
  tr.push(test(slabs,cons,expect));
}

{
  var cons = [42.22,20.01,12.00,24.94,80.63,16.72,22.20,9.20,5.60,10.00,32.92,2.66,18.44,39.57,37.71,9.90,41.05,45.87,0.00,0.00,43.15,7.90,79.17,29.83,27.77,20.95,103.95,23.48,13.67,45.35,16.74,0.00,69.67,78.66,18.60,105.83,51.06,50.31,70.47,0.50,0.00,6.30,0.70,33.87,9.00,52.08,34.62,22.96,1.30,28.90,53.24,18.90,61.75,81.78,11.88,0.00,88.09,67.17,21.03,39.00,19.30,80.78,46.16,41.00,0.00,52.19,6.80,0.00,7.02,51.09,90.36,30.54,7.62,127.54,14.51,28.04,20.97,59.70,43.87,81.07,55.59,72.67,1.10,62.85,77.01,13.10,5.25,30.15,10.68,6.70,20.78,21.75,16.26,20.46,52.05,40.52,39.24,52.16,32.78,92.43,69.62,21.52,29.08,14.35,22.88,3.94,0.14,5.40,0.00,1.75,53.79,35.25,33.13,23.46,26.98,58.89,43.08,0.77,0.00,0.00,14.26,0.00,8.90,2.69,32.42,6.20,9.88,6.00,11.27,16.52,60.16,42.06,11.60,39.75,46.73,13.90,1.20,31.72,34.88,25.75,6.90,30.30,47.38,98.04,42.37,5.90,36.67,32.88,51.18];
  var slabs = [[14*cons.length,100],[24*cons.length,300]];
  var expect = [8964,2301,1200,3780,20487,1672,2958,920,560,1000,6174,266,1844,8169,7611,990,8613,10059,0,0,9243,790,20049,5247,4629,2583,27483,3342,1367,9903,1674,0,17199,19896,1878,28047,11616,11391,17439,50,0,630,70,6459,900,11922,6684,3186,130,4968,12270,1968,14823,20832,1188,0,22725,16449,2607,7998,2088,20532,10146,8598,0,11955,680,0,702,11625,23406,5460,762,34560,1451,4710,2589,14208,9459,20619,12975,18099,110,15153,19401,1310,525,5343,1068,670,2532,2823,1626,2436,11913,8454,8070,11946,6132,24027,17184,2754,5022,1435,3162,394,14,540,0,175,12435,6873,6237,3336,4392,13965,9222,77,0,0,1426,0,890,269,6024,620,988,600,1127,1652,14346,8916,1160,8223,10317,1390,120,5814,6762,4023,690,5388,10512,25710,9009,590,7299,6162,11652];
  tr.push(test(slabs,cons,expect));
}

console.log(tr);