<template>
    <div>
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
            <div id="echartsDiv" :style="'height:500px;width:90%;margin-left:5%;margin-top:100px;'"></div>
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
            echart: null,
            echartsDivHeight: 0,
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
                        start: 0,
                        end: 100
                    },
                    {
                        show: true,
                        height: 20,
                        type: 'slider',
                        top: '90%',
                        xAxisIndex: [0],
                        start: 0,
                        end: 20
                    }
                ],
                series: [
                    {
                        name: '箱线图',
                        type: 'boxplot',
                        data: [],
                        tooltip: {formatter: this.formatter},
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
                                borderColor: 'black'
                            }
                        },
                    },
                    {//正向情绪平均值曲线
                        name: '正向平均情绪折线图',
                        data: [],
                        type: 'line',
                        itemStyle : {  
                            normal : {  
                                color:'green',
                                borderColor:'green',
                            }  
                        },
                    },
                    {//负向向情绪平均值曲线
                        name: '负向平均情绪折线图',
                        data: [],
                        type: 'line',
                        itemStyle : {  
                            normal : {  
                                color:'red',
                                borderColor:'red',
                            }  
                        },
                    }
                ]
            }
        }
    },
    computed: {
    },
    methods: {
        formatter(param) {
            return [
                '正向情绪最大值: ' + param.data[5],
                '正向情绪平均值 ' + param.data[4],
                '负向情绪最大值: ' + param.data[1],
                '负向情绪平均值' + param.data[2],
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
                this.echart = echarts.init(document.getElementById('echartsDiv'))
                this.echart.showLoading()
                getBoxPlotData(this.$route.query.cardNo).then((data) => {
                    this.echartsData.xAxis.data = data.result.xData;
                    this.echartsData.series[0].data = data.result.seriesBoxPlotData;
                    this.echartsData.series[1].data = data.result.seriesPositiveLineData;
                    this.echartsData.series[2].data = data.result.seriesNegativeLineData;
                    //this.calcThreshold(data.result.seriesBoxPlotData);
                    this.echart.setOption(this.echartsData)
                    this.echart.hideLoading()
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