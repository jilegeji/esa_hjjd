<template>
    <div style="background:#f5f7f9 !important;">
        <div id="otherDiv">
            <CHeader :showBack="true" :showAdd="false" :style="{position: 'fixed',width:'100%', height: '80px', top: 0,left: 0,'z-index':1000}"/>
            <Layout :style="{marginTop:'80px', overflow: 'auto'}">
                <Content style="overflow:auto">
                    <div style="position:relative;">
                        <div style="width:200px;position:absolute;top:0;bottom:0;display:flex;align-items:center;justify-content:center;">
                            <img style="max-height:80%;max-width:80%;" :src="'data:image/jpeg;base64,'+$route.query.picture"/>
                        </div>
                        <div style="margin-left:200px; height:100%;">
                            <Row>
                                <Col span="6"><div style="height:50px;display:flex;align-items:center;">姓名：{{$route.query.name}}</div></Col>
                                <Col span="6"><div style="height:50px;display:flex;align-items:center;">性别：{{$route.query.gender | sexFormat}}</div></Col>
                                <Col span="6"><div style="height:50px;display:flex;align-items:center;">民族：{{$route.query.nation}}</div></Col>
                                <Col span="6"><div style="height:50px;display:flex;align-items:center;">出生日期：{{$route.query.birthday | formatBirthday}}</div></Col>
                            </Row>
                            <Row>
                                <Col><div style="height:50px;display:flex;align-items:center;">住址：{{$route.query.address}}</div></Col>
                            </Row>
                            <Row>
                                <Col><div style="height:50px;display:flex;align-items:center;">身份证号：{{$route.query.cardNo}}</div></Col>
                            </Row>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
            <!-- <div id="echartsDiv" :style="'height:'+echartsDivHeight+'px;width:90%;margin-left:5%;margin-top:100px;'"></div>
            <div id="anxDiv" :style="'height:'+echartsDivHeight+'px;width:90%;margin-left:5%;margin-top:100px;'"></div> -->
            <div id="echartsDiv" style="height:450px;width:90%;margin-left:5%;margin-top:100px;"></div>
            <div id="anxDiv" style="height:450px;width:90%;margin-left:5%;margin-top:100px;"></div>
    </div>
</template>
<script>
import CHeader from '@/components/common/Header.vue'
import echarts from 'echarts'
import { getBoxPlotData } from '@/api/account'

export default {
    name: 'AccountDetail',
    data () {
        return {
            thresholdArr: [],
            echartsDivHeight: 0,
            anxData: {
                legend: {
                    data: ['焦虑情绪折线图']
                },
                grid: {
                    left: '10%',
                    top: '20%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    boundaryGap: true,
                    nameGap: 30,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '焦虑值',
                    min: 0,
                    max: 100,
                    splitArea: {
                        show: false
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                    },
                    {
                        show: true,
                        height: 20,
                        type: 'slider',
                        top: '90%',
                        xAxisIndex: [0],
                        showDataShadow: false  //不显示拖拽条的阴影
                    }
                    
                ],
                series: [
                    {
                        name: '焦虑情绪折线图',
                        data: [],
                        // tooltip: {
                        //     formatter: this.formatter,
                        // },
                        type: 'line',
                    }
                ]
            },
            echartsData: {
                legend: {
                    data: ['箱线图', '正向平均情绪折线图', '负向平均情绪折线图']
                },
                grid: {
                    left: '10%',
                    top: '20%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    boundaryGap: true,
                    nameGap: 30,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '情绪数值',
                    min: -100,
                    max: 100,
                    splitArea: {
                        show: false
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                    },
                    {
                        show: true,
                        height: 20,
                        type: 'slider',
                        top: '90%',
                        xAxisIndex: [0],
                        showDataShadow: false  //不显示拖拽条的阴影
                    }
                    
                ],
                // 说明：以下3种属性是优化缩放卡顿问题
                // sampling:'average',
                // showAllSymbol: false,
                series: [
                    {
                        name: '箱线图',
                        type: 'boxplot',
                        animationDuration: 500,
                        animationEasing: 'elasticOut',
                        boxWidth : 50,
                        zlevel: -1, //默认应该是0
                        data: [],
                        // silent: true,
                        tooltip: {
                            formatter: this.formatter,
                        },
                        itemStyle : {  
                            normal  : {  
                                //第一种写法，这是理论上最标准的写法，但是不行。（右/下/左/上）
                                // color: (params)=> {
                                //     console.log(this.thresholdArr[params.dataIndex]);
                                //     return {
                                //         type: 'linear',
                                //         x: 0,
                                //         y: 0,
                                //         x2: 0,
                                //         y2: 1,
                                //         colorStops: [{
                                //             offset: 0, color: 'green' // 0% 处的颜色
                                //         },
                                //         {
                                //             offset: this.thresholdArr[params.dataIndex], color: 'green' // 0% 处的颜色
                                //         },
                                //         {
                                //             offset: this.thresholdArr[params.dataIndex], color: 'red' // 0% 处的颜色
                                //         },
                                //         {
                                //             offset: 1, color: 'red' // 100% 处的颜色
                                //         }],
                                //         global: false // 缺省为 false
                                //     }
                                // },
                                //第二种写法，function函数貌似没有被echarts调用，那我们就自己闭包调用。结果还是不行。
                                // color: function (params) {
                                //     (function(params){
                                //         console.log(window.thresholdArr[params.dataIndex]);
                                //         return {
                                //             type: 'linear',
                                //             x: 0,
                                //             y: 0,
                                //             x2: 0,
                                //             y2: 1,
                                //             colorStops: [{
                                //                 offset: 0, color: 'green' // 0% 处的颜色
                                //             },
                                //             {
                                //                 offset: 0.5, color: 'green' // 0% 处的颜色
                                //             },
                                //             {
                                //                 offset: 0.5, color: 'red' // 0% 处的颜色
                                //             },
                                //             {
                                //                 offset: 1, color: 'red' // 100% 处的颜色
                                //             }],
                                //             global: false // 缺省为 false
                                //         }
                                //     })(params)
                                // },
                                borderColor: 'black',
                                sampling:'average',
                                showAllSymbol: false,
                            }
                        },
                    },
                    {//正向情绪平均值曲线
                        name: '正向平均情绪折线图',
                        data: [],
                        // tooltip: {
                        //     formatter: this.formatter,
                        // },
                        type: 'line',
                        itemStyle : {  
                            normal : {  
                                color:'green',
                                borderColor:'green',
                            }  
                        },
                        sampling:'average',
                        showAllSymbol: false,
                    },
                    {//负向向情绪平均值曲线
                        name: '负向平均情绪折线图',
                        data: [],
                        // tooltip: {
                        //     formatter: this.formatter,
                        // },
                        type: 'line',
                        itemStyle : {  
                            normal : {  
                                color:'#FFCC00',
                                borderColor:'#FFCC00',
                            }  
                        },
                        sampling:'average',
                        showAllSymbol: false,
                    },
                    {
                        name: '箱线图',
                        animationDuration: 500,
                        animationEasing: 'elasticOut',
                        data: [],
                        tooltip: {
                            formatter: this.formatter,
                        },
                        barWidth : 50,
                        type: 'bar',
                        stack:'柱状图',
                        itemStyle:{
                            normal:{
                                color:"green"
                            },
                        },
                        sampling:'average',
                        showAllSymbol: false,
                    },
                    {
                        name: '箱线图',
                        animationDuration: 500,
                        animationEasing: 'elasticOut',
                        data: [],
                        tooltip: {
                            formatter: this.formatter,
                        },
                        barWidth : 50,
                        type: 'bar',
                        stack:'柱状图',
                        itemStyle:{
                            normal:{
                                color:"#FFCC00"
                            },
                        },
                        sampling:'average',
                        showAllSymbol: false,
                    },
                ]
            }
        }
    },
    computed: {
    },
    methods: {
        formatter(param) {
            return [
                this.echartsData.xAxis.data[param.dataIndex],
                "<span style='color:#00FF00;'>" +
                '正向情绪最大值: ' + this.echartsData.series[0].data[param.dataIndex][4],
                '正向情绪平均值 ' + this.echartsData.series[0].data[param.dataIndex][3]
                + "</span>",
                "<span style='color:yellow;'>" +
                '负向情绪最大值: ' + this.echartsData.series[0].data[param.dataIndex][0],
                '负向情绪平均值' + this.echartsData.series[0].data[param.dataIndex][1]
                + "</span>"
            ].join('<br/>');
        },
        //该计算方法有待改进，箱线图是从最大值到最小值都算。所以只求"中间箱子"的比例是不准确的
        calcThreshold(params) {
            for(let i=0;i<params.length;i++){
                let total = params[i][3]-params[i][1];
                let threshold = 0;
                if(total!=0){
                    threshold = params[i][3]/total;
                }
                this.thresholdArr.push(threshold);
                window.thresholdArr = this.thresholdArr;
            }
        }
    },
    created() {
    },
    mounted() {
        this.echartsDivHeight = $(window).height() - $("#otherDiv").height() - 80 -200;
        this.$nextTick(
            ()=>{
                let anxEcharts = echarts.init(document.getElementById('anxDiv'))
                anxEcharts.showLoading()
                let echart = echarts.init(document.getElementById('echartsDiv'))
                echart.showLoading()
                getBoxPlotData(this.$route.query.cardNo).then((data) => {
                    //情绪折线图
                    this.anxData.xAxis.data = data.result.xData
                    this.anxData.dataZoom[0].startValue = data.result.xData.length-1>0?data.result.xData.length-1:0;
                    this.anxData.dataZoom[0].endValue = data.result.xData.length-7>0?data.result.xData.length-7:0;
                    this.anxData.series[0].data = data.result.seriesAnxLineData
                    anxEcharts.setOption(this.anxData)
                    anxEcharts.hideLoading()
                    //综合图
                    this.echartsData.xAxis.data = data.result.xData;
                    this.echartsData.dataZoom[0].startValue = data.result.xData.length-1>0?data.result.xData.length-1:0;
                    this.echartsData.dataZoom[0].endValue = data.result.xData.length-7>0?data.result.xData.length-7:0;
                    this.echartsData.series[0].data = data.result.seriesBoxPlotData;
                    this.echartsData.series[1].data = data.result.seriesPositiveLineData;
                    this.echartsData.series[2].data = data.result.seriesNegativeLineData;
                    this.echartsData.series[3].data = data.result.seriesPositiveLineData;
                    this.echartsData.series[4].data = data.result.seriesNegativeLineData;
                    //this.calcThreshold(data.result.seriesBoxPlotData);
                    echart.setOption(this.echartsData)
                    echart.hideLoading()
                })
            }
        )
    },
    components: {
        CHeader
    },
    filters: {
        sexFormat: (val)=> {
            if(val===1 || val==='1'){
                return '男'
            }
            if(val===0 ||  val==='0'){
                return '女'
            }
        },
        formatBirthday: (birthday)=> {
            return birthday.replace(/(.{4})(.{2})/,"$1-$2-")
        }
    }
}
</script>