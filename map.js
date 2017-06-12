/**********************************************************************************
 ******************************0、兼容IE8************************************
 **********************************************************************************/
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var k;
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }
        if (n >= len) {
            return -1;
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}
/**********************************************************************************
 ******************************1、地图初始化显示************************************
 **********************************************************************************/
var url = "http://hdnav.zicp.net";
// 新建地图对象
var map = new HDMap.Map('map', {zoomsliderControl: true});
// Attribution信息
var hdmapAttrib = '&copy; <a href="howtoHDMap/app/index.html"target="_blank">HDMap 开发指南</a>';
// mapbox地图
// var mboxLayerUrl = "https://api.mapbox.com/v4/mapbox.pirates/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q";
var sswlMapUrl = "https://api.mapbox.com/styles/v1/edenhalperin/cih84uopy000a95m41htugsnm/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWRlbmhhbHBlcmluIiwiYSI6IlFRZG0zMWMifQ.QUNKx4tIMjZfwmrE8SE6Bg";
//var sswlMapUrl = "https://api.mapbox.com/styles/v1/edenhalperin/cih84uopy000a95m41htugsnm/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWRlbmhhbHBlcmluIiwiYSI6IlFRZG0zMWMifQ.QUNKx4tIMjZfwmrE8SE6Bg";
// OSM地图
var osmLayerUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
// 水上物流融合图
var mboxLayerUrl = url + ':8008/'+"/v1/rastertiles/SSWL_map/{z}/{x}/{y}.png";
// 海陆融合图
var mixMapUrl = url+':8008/' + "/v1/rastertiles/mix_map/{z}/{x}/{y}.png";
var mixGridUrl = url +':8008/'+ "/v1/rastertiles/mix_grid/{z}/{x}/{y}.json";
// 陆图
var landMapUrl = url + ':8008/'+"/v1/rastertiles/land_map/{z}/{x}/{y}.png";
var landGridUrl = url + ':8008/'+"/v1/rastertiles/land_grid/{z}/{x}/{y}.json";
// 海图
var seaMapUrl = url + ':8008/'+"/v1/rastertiles/sea_map/{z}/{x}/{y}.png";
var seaGridUrl = url + ':8008/'+"/v1/rastertiles/sea_grid/{z}/{x}/{y}.json";
// 绘画风格
var galleryMapUrl = "https://api.mapbox.com/styles/v1/edenhalperin/cifq0r0e5000q85m0d293k6mq/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWRlbmhhbHBlcmluIiwiYSI6IlFRZG0zMWMifQ.QUNKx4tIMjZfwmrE8SE6Bg";
// 明亮风格
var brightMapUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q";
// 老地图
var oldMapUrl = "https://api.mapbox.com/styles/v1/mslee/cif5p01n202nisaktvljx9mv3/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg";
// 蓝图
var blueMapUrl = "https://api.mapbox.com/styles/v1/mslee/ciellcr9y001g5pknxuqwjhqm/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg";
// 北半球图
var northMapUrl = "https://api.mapbox.com/styles/v1/aj/cievxpmc00wsmqam3dqntax4o/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2loN3g1YWh0MHQ2OXV1a2k2eGtzeDhiayJ9.WbVSgpJDUjhaM2L0qdMJ2w";
// 卫星图
var satMapUrl = "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
// 图层切换显示的图层
var baseLayersForlayersControl = {
    "融合图": HDMap.tileLayer(mixMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
    "陆图": HDMap.tileLayer(landMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18}),
    "海图": HDMap.tileLayer(seaMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
    "卫星图": HDMap.tileLayer(satMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
    "明亮风格": HDMap.tileLayer(brightMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "绘画风格": HDMap.tileLayer(galleryMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "老地图": HDMap.tileLayer(oldMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "蓝图": HDMap.tileLayer(blueMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "北半球图": HDMap.tileLayer(northMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "OSM": HDMap.tileLayer(osmLayerUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18})
};
// 非图层切换显示的图层以及utfgridLayer
var baseLayers = {
    // mapbox地图
    mboxLayer: HDMap.tileLayer(mboxLayerUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18}),
    // utfgridLayer
    mixGrid: HDMap.utfgridLayer(mixGridUrl, {resolution: 4}),
    landGrid: HDMap.utfgridLayer(landGridUrl, {resolution: 4}),
    seaGrid: HDMap.utfgridLayer(seaGridUrl, {resolution: 4})
};
// 地图添加初始显示
map.addLayer(baseLayersForlayersControl["融合图"], baseLayers.mixGrid);
map.addLayer(baseLayers.mixGrid);
// 设置初始坐标点以及缩放级别
map.setView(new HDMap.LatLng(38.92705, 121.6580833), 10);

/**********************************************************************************
 ********************************3、地图添加控件************************************
 **********************************************************************************/

/*************（1）比例尺控件************/
map.addControl(new HDMap.Control.Scale());

/*************（2）图层切换控件************/
// 船舶轨迹函数
var data = {
    "type": "0",
    "details": [{
        "lon": "121.6544",
        "lat": "38.9318",
        "nlon": "121.659403",
        "nlat": "38.9326409",
        "ship_type": "6",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "441943000",
        "course": "0.0",
        "name": "DA IN",
        "true_head": "21.0",
        "length": "134.0",
        "width": "21.0"
    }, {
        "lon": "121.8538",
        "lat": "38.7543",
        "nlon": "121.858697",
        "nlat": "38.755035",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "19.5",
        "mmsi": "241034000",
        "course": "29.5",
        "name": "CMACGM DEBUSSY",
        "true_head": "26.0",
        "length": "300.0",
        "width": "40.0"
    }, {
        "lon": "121.655",
        "lat": "38.933",
        "nlon": "121.660004",
        "nlat": "38.933843",
        "ship_type": "6",
        "nav_status": "5",
        "speed": "0.1",
        "mmsi": "413127000",
        "course": "148.0",
        "name": "PU TUO DAO",
        "true_head": "204.0",
        "length": "138.0",
        "width": "24.0"
    }, {
        "lon": "121.7554",
        "lat": "38.9181",
        "nlon": "121.760532",
        "nlat": "38.919061",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "9.0",
        "mmsi": "412473460",
        "course": "169.0",
        "name": "DONG MAO 2",
        "true_head": "170.0",
        "length": "103.0",
        "width": "16.0"
    }, {
        "lon": "121.9263",
        "lat": "38.9892",
        "nlon": "121.931154",
        "nlat": "38.990037",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "10.7",
        "mmsi": "477097100",
        "course": "314.8",
        "name": "DONGHAI",
        "true_head": "302.0",
        "length": "117.0",
        "width": "20.0"
    }, {
        "lon": "121.7476",
        "lat": "39.0146",
        "nlon": "121.752746",
        "nlat": "39.01562",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413471970",
        "course": "194.9",
        "name": "RU YI SONG",
        "true_head": "331.0",
        "length": "180.0",
        "width": "27.0"
    }, {
        "lon": "121.6506",
        "lat": "38.9337",
        "nlon": "121.655596",
        "nlat": "38.934536",
        "ship_type": "9",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412701000",
        "course": "133.0",
        "name": "YU KUN",
        "true_head": "22.0",
        "length": "116.0",
        "width": "18.0"
    }, {
        "lon": "121.653",
        "lat": "38.9326",
        "nlon": "121.658",
        "nlat": "38.933439",
        "ship_type": "3",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412208990",
        "course": "0.0",
        "name": "JINHAI",
        "true_head": "0.0",
        "length": "38.0",
        "width": "10.0"
    }, {
        "lon": "121.8324",
        "lat": "38.9677",
        "nlon": "121.837378",
        "nlat": "38.968591",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413375860",
        "course": "166.9",
        "name": "WU LIU XIAN FENG",
        "true_head": "180.0",
        "length": "108.0",
        "width": "26.0"
    }, {
        "lon": "121.6544",
        "lat": "38.9662",
        "nlon": "121.659407",
        "nlat": "38.967062",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413630120",
        "course": "351.9",
        "name": "KUN LUN YOU 203",
        "true_head": "321.0",
        "length": "177.0",
        "width": "29.0"
    }, {
        "lon": "121.9263",
        "lat": "38.9892",
        "nlon": "121.931154",
        "nlat": "38.990037",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "10.7",
        "mmsi": "477097100",
        "course": "314.8",
        "name": "DONGHAI",
        "true_head": "302.0",
        "length": "117.0",
        "width": "20.0"
    }, {
        "lon": "121.8901",
        "lat": "38.9975",
        "nlon": "121.894957",
        "nlat": "38.998331",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "441567000",
        "course": "82.0",
        "name": "PEGASUS PACER",
        "true_head": "305.0",
        "length": "127.0",
        "width": "20.0"
    }, {
        "lon": "121.687",
        "lat": "38.9752",
        "nlon": "121.692076",
        "nlat": "38.976129",
        "ship_type": "0",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413200980",
        "course": "152.2",
        "name": "HAI CHANG 28",
        "true_head": "337.0",
        "length": "91.03",
        "width": "13.5"
    }, {
        "lon": "121.7558",
        "lat": "39.01",
        "nlon": "121.760942",
        "nlat": "39.011017",
        "ship_type": "0",
        "nav_status": "8",
        "speed": "1.1",
        "mmsi": "412002460",
        "course": "23.2",
        "name": "LIAN GANG 29",
        "true_head": "23.2",
        "length": "36.5",
        "width": "10.4"
    }, {
        "lon": "121.7557",
        "lat": "39.0092",
        "nlon": "121.760842",
        "nlat": "39.010217",
        "ship_type": "5",
        "nav_status": "8",
        "speed": "0.1",
        "mmsi": "412002470",
        "course": "53.3",
        "name": "LIAN GANG 30",
        "true_head": "53.3",
        "length": "39.0",
        "width": "12.0"
    }, {
        "lon": "121.6606",
        "lat": "38.9288",
        "nlon": "121.665615",
        "nlat": "38.929651",
        "ship_type": "5",
        "nav_status": "15",
        "speed": "0.1",
        "mmsi": "412002250",
        "course": "22.1",
        "name": "LIAN GANG 6",
        "true_head": "22.1",
        "length": "28.0",
        "width": "7.0"
    }, {
        "lon": "121.8723",
        "lat": "39.0069",
        "nlon": "121.877184",
        "nlat": "39.007752",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413693110",
        "course": "218.2",
        "name": "SHENG FENG 8",
        "true_head": "218.0",
        "length": "122.0",
        "width": "18.0"
    }, {
        "lon": "121.6596",
        "lat": "38.9292",
        "nlon": "121.664613",
        "nlat": "38.9300489",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413002030",
        "course": "338.5",
        "name": "LIAN GANG 35",
        "true_head": "338.5",
        "length": "35.0",
        "width": "9.8"
    }, {
        "lon": "121.8813",
        "lat": "39.0044",
        "nlon": "121.886169",
        "nlat": "39.005241",
        "ship_type": "0",
        "nav_status": "15",
        "speed": "9.6",
        "mmsi": "413002040",
        "course": "74.6",
        "name": "LIAN GANG 36",
        "true_head": "106.0",
        "length": "35.0",
        "width": "9.8"
    }, {
        "lon": "121.6081",
        "lat": "38.933",
        "nlon": "121.613042",
        "nlat": "38.933785",
        "ship_type": "6",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "412204440",
        "course": "89.4",
        "name": "CHENG HAI",
        "true_head": "339.0",
        "length": "116.0",
        "width": "18.0"
    }, {
        "lon": "121.6073",
        "lat": "38.9318",
        "nlon": "121.612242",
        "nlat": "38.932584",
        "ship_type": "6",
        "nav_status": "0",
        "speed": "0.1",
        "mmsi": "412202470",
        "course": "159.7",
        "name": "YUN HAI",
        "true_head": "255.0",
        "length": "116.0",
        "width": "21.0"
    }, {
        "lon": "121.877",
        "lat": "39.0023",
        "nlon": "121.881875",
        "nlat": "39.003144",
        "ship_type": "5",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413002090",
        "course": "142.6",
        "name": "LIAN GANG 39",
        "true_head": "75.0",
        "length": "35.0",
        "width": "11.0"
    }, {
        "lon": "121.8768",
        "lat": "39.0023",
        "nlon": "121.881676",
        "nlat": "39.003144",
        "ship_type": "5",
        "nav_status": "0",
        "speed": "0.1",
        "mmsi": "413002110",
        "course": "243.8",
        "name": "LIAN GANG 40",
        "true_head": "354.0",
        "length": "35.0",
        "width": "11.0"
    }, {
        "lon": "121.6506",
        "lat": "38.9337",
        "nlon": "121.655596",
        "nlat": "38.934536",
        "ship_type": "9",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412701000",
        "course": "133.0",
        "name": "YU KUN",
        "true_head": "22.0",
        "length": "116.0",
        "width": "18.0"
    }, {
        "lon": "121.664",
        "lat": "38.9348",
        "nlon": "121.669023",
        "nlat": "38.935661",
        "ship_type": "0",
        "nav_status": "8",
        "speed": "8.6",
        "mmsi": "412002490",
        "course": "215.6",
        "name": "LIAN GANG 32",
        "true_head": "215.6",
        "length": "34.05",
        "width": "9.8"
    }, {
        "lon": "121.7034",
        "lat": "38.9418",
        "nlon": "121.708503",
        "nlat": "38.942737",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "445498000",
        "course": "256.8",
        "name": "MI RIM",
        "true_head": "256.8",
        "length": "96.0",
        "width": "14.0"
    }, {
        "lon": "121.8066",
        "lat": "38.9805",
        "nlon": "121.811651",
        "nlat": "38.981446",
        "ship_type": "2",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "273147000",
        "course": "0.0",
        "name": "USSURI",
        "true_head": "319.0",
        "length": "129.0",
        "width": "18.0"
    }, {
        "lon": "121.8192",
        "lat": "38.9581",
        "nlon": "121.824214",
        "nlat": "38.95901",
        "ship_type": "3",
        "nav_status": "0",
        "speed": "9.7",
        "mmsi": "412207540",
        "course": "29.1",
        "name": "LIAN GANG 41",
        "true_head": "21.0",
        "length": "34.0",
        "width": "12.0"
    }, {
        "lon": "121.875",
        "lat": "39.0013",
        "nlon": "121.879879",
        "nlat": "39.002145",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412002390",
        "course": "206.1",
        "name": "LIAN GANG 7",
        "true_head": "206.1",
        "length": "25.9",
        "width": "7.3"
    }, {
        "lon": "121.6836",
        "lat": "38.9685",
        "nlon": "121.688669",
        "nlat": "38.969419",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413435690",
        "course": "117.0",
        "name": "JIA XIN 1 HAO",
        "true_head": "319.0",
        "length": "86.0",
        "width": "15.0"
    }, {
        "lon": "121.8843",
        "lat": "39.0015",
        "nlon": "121.889164",
        "nlat": "39.002337",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412002480",
        "course": "161.3",
        "name": "LIAN GANG 31",
        "true_head": "161.3",
        "length": "34.05",
        "width": "9.8"
    }, {
        "lon": "121.9251",
        "lat": "38.9675",
        "nlon": "121.92995",
        "nlat": "38.968322",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "15.8",
        "mmsi": "413002060",
        "course": "341.3",
        "name": "LIAN YIN 2",
        "true_head": "340.0",
        "length": "13.88",
        "width": "4.75"
    }, {
        "lon": "121.656",
        "lat": "38.9361",
        "nlon": "121.661007",
        "nlat": "38.936947",
        "ship_type": "0",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412015210",
        "course": "281.2",
        "name": "HAI XUN 15003",
        "true_head": "111.0",
        "length": "33.66",
        "width": "5.8"
    }, {
        "lon": "121.6587",
        "lat": "38.9295",
        "nlon": "121.663711",
        "nlat": "38.930348",
        "ship_type": "5",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412207550",
        "course": "113.6",
        "name": "LIAN GANG 42",
        "true_head": "117.0",
        "length": "33.0",
        "width": "10.0"
    }, {
        "lon": "121.7071",
        "lat": "39.0151",
        "nlon": "121.712217",
        "nlat": "39.016087",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412002120",
        "course": "313.5",
        "name": "LIAN YOU 9",
        "true_head": "315.0",
        "length": "46.0",
        "width": "8.0"
    }, {
        "lon": "121.6556",
        "lat": "38.9363",
        "nlon": "121.660606",
        "nlat": "38.937146",
        "ship_type": "0",
        "nav_status": "15",
        "speed": "0.0",
        "mmsi": "412015220",
        "course": "309.0",
        "name": "HAI XUN 15009",
        "true_head": "70.0",
        "length": "42.16",
        "width": "8.2"
    }, {
        "lon": "121.6278",
        "lat": "38.9583",
        "nlon": "121.632761",
        "nlat": "38.959117",
        "ship_type": "8",
        "nav_status": "8",
        "speed": "0.0",
        "mmsi": "412433410",
        "course": "360.0",
        "name": "XIANG SHENG HAI 2",
        "true_head": "45.0",
        "length": "42.0",
        "width": "8.0"
    }, {
        "lon": "121.6589",
        "lat": "38.9305",
        "nlon": "121.663912",
        "nlat": "38.931349",
        "ship_type": "0",
        "nav_status": "8",
        "speed": "0.0",
        "mmsi": "413002010",
        "course": "240.7",
        "name": "LIAN GANG 33",
        "true_head": "240.7",
        "length": "35.0",
        "width": "11.0"
    }, {
        "lon": "121.7639",
        "lat": "38.8684",
        "nlon": "121.769019",
        "nlat": "38.86933",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "8.6",
        "mmsi": "413411940",
        "course": "176.7",
        "name": "ZHE YONG YOU 5",
        "true_head": "215.0",
        "length": "88.0",
        "width": "14.0"
    }, {
        "lon": "121.6996",
        "lat": "39.0112",
        "nlon": "121.704705",
        "nlat": "39.012173",
        "ship_type": "6",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413409000",
        "course": "188.2",
        "name": "BO HAI ZHEN ZHU",
        "true_head": "195.0",
        "length": "164.0",
        "width": "25.0"
    }, {
        "lon": "121.6986",
        "lat": "39.018",
        "nlon": "121.703704",
        "nlat": "39.018976",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412430810",
        "course": "109.1",
        "name": "CHANG SHENG 3",
        "true_head": "164.0",
        "length": "98.0",
        "width": "15.0"
    }, {
        "lon": "121.9363",
        "lat": "38.9801",
        "nlon": "121.941166",
        "nlat": "38.980945",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "13.0",
        "mmsi": "311010400",
        "course": "344.8",
        "name": "TRIDENT",
        "true_head": "339.0",
        "length": "145.0",
        "width": "22.0"
    }, {
        "lon": "121.8723",
        "lat": "39.0069",
        "nlon": "121.877184",
        "nlat": "39.007752",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413693110",
        "course": "218.2",
        "name": "SHENG FENG 8",
        "true_head": "218.0",
        "length": "122.0",
        "width": "18.0"
    }, {
        "lon": "121.5952",
        "lat": "39.1167",
        "nlon": "121.600163",
        "nlat": "39.117595",
        "ship_type": "0",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "412592280",
        "course": "44.0",
        "name": "XI YANG 14 HAO",
        "true_head": "44.0",
        "length": "89.15",
        "width": "16.0"
    }, {
        "lon": "121.6911",
        "lat": "38.9705",
        "nlon": "121.696184",
        "nlat": "38.971434",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412570220",
        "course": "62.1",
        "name": "MING TONG",
        "true_head": "62.1",
        "length": "94.0",
        "width": "14.0"
    }, {
        "lon": "121.6109",
        "lat": "38.9443",
        "nlon": "121.615845",
        "nlat": "38.945093",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "0.1",
        "mmsi": "413202030",
        "course": "246.1",
        "name": "XIN HONG SHENG 1",
        "true_head": "342.0",
        "length": "88.0",
        "width": "13.0"
    }, {
        "lon": "121.7443",
        "lat": "39.0189",
        "nlon": "121.749447",
        "nlat": "39.019922",
        "ship_type": "7",
        "nav_status": "8",
        "speed": "0.1",
        "mmsi": "412207630",
        "course": "144.3",
        "name": "SHUANG LIAN 6",
        "true_head": "144.3",
        "length": "52.0",
        "width": "9.0"
    }, {
        "lon": "121.7311",
        "lat": "38.9785",
        "nlon": "121.736239",
        "nlat": "38.979491",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413503450",
        "course": "185.6",
        "name": "JIE HANG 668",
        "true_head": "321.0",
        "length": "97.0",
        "width": "16.0"
    }, {
        "lon": "121.5943",
        "lat": "39.1189",
        "nlon": "121.599264",
        "nlat": "39.119797",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.2",
        "mmsi": "412070650",
        "course": "75.9",
        "name": "HANG XUN 6",
        "true_head": "75.9",
        "length": "18.7",
        "width": "4.0"
    }, {
        "lon": "121.8057",
        "lat": "38.9781",
        "nlon": "121.810753",
        "nlat": "38.9790459",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413660000",
        "course": "98.0",
        "name": "AN GUO SHAN",
        "true_head": "54.0",
        "length": "199.0",
        "width": "32.0"
    }, {
        "lon": "121.6591",
        "lat": "38.9309",
        "nlon": "121.664113",
        "nlat": "38.931749",
        "ship_type": "5",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412207680",
        "course": "0.0",
        "name": "LIAN GANG 44",
        "true_head": "39.0",
        "length": "33.0",
        "width": "12.0"
    }, {
        "lon": "121.7075",
        "lat": "38.9271",
        "nlon": "121.712608",
        "nlat": "38.9280339",
        "ship_type": "5",
        "nav_status": "0",
        "speed": "11.4",
        "mmsi": "412207670",
        "course": "280.7",
        "name": "LIAN GANG 43",
        "true_head": "273.0",
        "length": "32.5",
        "width": "10.2"
    }, {
        "lon": "121.6906",
        "lat": "38.9835",
        "nlon": "121.695684",
        "nlat": "38.9844409",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.3",
        "mmsi": "412207790",
        "course": "110.2",
        "name": "JIN DA SHENG",
        "true_head": "110.2",
        "length": "55.0",
        "width": "9.0"
    }, {
        "lon": "121.5943",
        "lat": "39.1189",
        "nlon": "121.599264",
        "nlat": "39.119797",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.2",
        "mmsi": "412070650",
        "course": "75.9",
        "name": "HANG XUN 6",
        "true_head": "75.9",
        "length": "18.7",
        "width": "4.0"
    }, {
        "lon": "121.9035",
        "lat": "39.0037",
        "nlon": "121.908348",
        "nlat": "39.004532",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.6",
        "mmsi": "412207750",
        "course": "266.0",
        "name": "LIAN GANG 45",
        "true_head": "244.0",
        "length": "35.0",
        "width": "11.0"
    }, {
        "lon": "121.9035",
        "lat": "39.0037",
        "nlon": "121.908348",
        "nlat": "39.004532",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.6",
        "mmsi": "412207750",
        "course": "266.0",
        "name": "LIAN GANG 45",
        "true_head": "244.0",
        "length": "35.0",
        "width": "11.0"
    }, {
        "lon": "121.7446",
        "lat": "39.0185",
        "nlon": "121.749747",
        "nlat": "39.019522",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413693130",
        "course": "0.0",
        "name": "XIN LU SHENG 5",
        "true_head": "152.0",
        "length": "122.0",
        "width": "18.0"
    }, {
        "lon": "121.8813",
        "lat": "39.0023",
        "nlon": "121.886169",
        "nlat": "39.00314",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.1",
        "mmsi": "413175000",
        "course": "228.9",
        "name": "XIN JIU ZHOU",
        "true_head": "302.0",
        "length": "240.0",
        "width": "32.0"
    }, {
        "lon": "121.949",
        "lat": "38.9217",
        "nlon": "121.953883",
        "nlat": "38.9225319",
        "ship_type": "0",
        "nav_status": "15",
        "speed": "5.8",
        "mmsi": "413002050",
        "course": "2.0",
        "name": "LIAN YIN 1",
        "true_head": "348.0",
        "length": "13.88",
        "width": "4.75"
    }, {
        "lon": "121.5943",
        "lat": "39.1189",
        "nlon": "121.599264",
        "nlat": "39.119797",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.2",
        "mmsi": "412070650",
        "course": "75.9",
        "name": "HANG XUN 6",
        "true_head": "75.9",
        "length": "18.7",
        "width": "4.0"
    }, {
        "lon": "121.738",
        "lat": "39.0275",
        "nlon": "121.743148",
        "nlat": "39.028526",
        "ship_type": "6",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412900000",
        "course": "182.0",
        "name": "LONG XING DAO",
        "true_head": "149.0",
        "length": "168.0",
        "width": "25.0"
    }, {
        "lon": "121.7311",
        "lat": "38.9785",
        "nlon": "121.736239",
        "nlat": "38.979491",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413503450",
        "course": "185.6",
        "name": "JIE HANG 668",
        "true_head": "321.0",
        "length": "97.0",
        "width": "16.0"
    }, {
        "lon": "121.6597",
        "lat": "38.935",
        "nlon": "121.664714",
        "nlat": "38.935853",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412208390",
        "course": "139.4",
        "name": "LIAN HUI QING 9",
        "true_head": "139.4",
        "length": "64.0",
        "width": "10.0"
    }, {
        "lon": "121.7554",
        "lat": "38.9181",
        "nlon": "121.760532",
        "nlat": "38.919061",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "9.0",
        "mmsi": "412473460",
        "course": "169.0",
        "name": "DONG MAO 2",
        "true_head": "170.0",
        "length": "103.0",
        "width": "16.0"
    }, {
        "lon": "121.9398",
        "lat": "38.9122",
        "nlon": "121.944664",
        "nlat": "38.913009",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "14.9",
        "mmsi": "538002509",
        "course": "15.0",
        "name": "CAPE FRASER",
        "true_head": "10.0",
        "length": "154.0",
        "width": "24.0"
    }, {
        "lon": "121.7557",
        "lat": "39.0092",
        "nlon": "121.760842",
        "nlat": "39.010217",
        "ship_type": "5",
        "nav_status": "8",
        "speed": "0.1",
        "mmsi": "412002470",
        "course": "53.3",
        "name": "LIAN GANG 30",
        "true_head": "53.3",
        "length": "39.0",
        "width": "12.0"
    }, {
        "lon": "121.7554",
        "lat": "38.9181",
        "nlon": "121.760532",
        "nlat": "38.919061",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "9.0",
        "mmsi": "412473460",
        "course": "169.0",
        "name": "DONG MAO 2",
        "true_head": "170.0",
        "length": "103.0",
        "width": "16.0"
    }, {
        "lon": "121.8481",
        "lat": "38.95",
        "nlon": "121.853033",
        "nlat": "38.950852",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412378570",
        "course": "59.8",
        "name": "HAI LIAN 68",
        "true_head": "304.0",
        "length": "92.0",
        "width": "16.0"
    }, {
        "lon": "121.8481",
        "lat": "38.95",
        "nlon": "121.853033",
        "nlat": "38.950852",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412378570",
        "course": "59.8",
        "name": "HAI LIAN 68",
        "true_head": "304.0",
        "length": "92.0",
        "width": "16.0"
    }, {
        "lon": "121.6596",
        "lat": "38.9292",
        "nlon": "121.664613",
        "nlat": "38.9300489",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413002030",
        "course": "338.5",
        "name": "LIAN GANG 35",
        "true_head": "338.5",
        "length": "35.0",
        "width": "9.8"
    }, {
        "lon": "121.6302",
        "lat": "38.9575",
        "nlon": "121.635164",
        "nlat": "38.958319",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412208230",
        "course": "348.5",
        "name": "ZHONG HAI GONG 3",
        "true_head": "78.0",
        "length": "49.0",
        "width": "10.0"
    }, {
        "lon": "121.8768",
        "lat": "39.0023",
        "nlon": "121.881676",
        "nlat": "39.003144",
        "ship_type": "5",
        "nav_status": "0",
        "speed": "0.1",
        "mmsi": "413002110",
        "course": "243.8",
        "name": "LIAN GANG 40",
        "true_head": "354.0",
        "length": "35.0",
        "width": "11.0"
    }, {
        "lon": "121.7034",
        "lat": "38.9418",
        "nlon": "121.708503",
        "nlat": "38.942737",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "445498000",
        "course": "256.8",
        "name": "MI RIM",
        "true_head": "256.8",
        "length": "96.0",
        "width": "14.0"
    }, {
        "lon": "121.7456",
        "lat": "39.0244",
        "nlon": "121.750747",
        "nlat": "39.025426",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.1",
        "mmsi": "412429490",
        "course": "242.2",
        "name": "ZHOU HAI DA 16",
        "true_head": "149.0",
        "length": "128.0",
        "width": "18.0"
    }, {
        "lon": "121.738",
        "lat": "39.0275",
        "nlon": "121.743148",
        "nlat": "39.028526",
        "ship_type": "6",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412900000",
        "course": "182.0",
        "name": "LONG XING DAO",
        "true_head": "149.0",
        "length": "168.0",
        "width": "25.0"
    }, {
        "lon": "121.7034",
        "lat": "38.9418",
        "nlon": "121.708503",
        "nlat": "38.942737",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "445498000",
        "course": "256.8",
        "name": "MI RIM",
        "true_head": "256.8",
        "length": "96.0",
        "width": "14.0"
    }, {
        "lon": "121.8813",
        "lat": "39.0023",
        "nlon": "121.886169",
        "nlat": "39.00314",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.1",
        "mmsi": "413175000",
        "course": "228.9",
        "name": "XIN JIU ZHOU",
        "true_head": "302.0",
        "length": "240.0",
        "width": "32.0"
    }, {
        "lon": "121.949",
        "lat": "38.9217",
        "nlon": "121.953883",
        "nlat": "38.9225319",
        "ship_type": "0",
        "nav_status": "15",
        "speed": "5.8",
        "mmsi": "413002050",
        "course": "2.0",
        "name": "LIAN YIN 1",
        "true_head": "348.0",
        "length": "13.88",
        "width": "4.75"
    }, {
        "lon": "121.738",
        "lat": "39.0275",
        "nlon": "121.743148",
        "nlat": "39.028526",
        "ship_type": "6",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412900000",
        "course": "182.0",
        "name": "LONG XING DAO",
        "true_head": "149.0",
        "length": "168.0",
        "width": "25.0"
    }, {
        "lon": "121.8481",
        "lat": "38.95",
        "nlon": "121.853033",
        "nlat": "38.950852",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412378570",
        "course": "59.8",
        "name": "HAI LIAN 68",
        "true_head": "304.0",
        "length": "92.0",
        "width": "16.0"
    }, {
        "lon": "121.7034",
        "lat": "38.9418",
        "nlon": "121.708503",
        "nlat": "38.942737",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "445498000",
        "course": "256.8",
        "name": "MI RIM",
        "true_head": "256.8",
        "length": "96.0",
        "width": "14.0"
    }, {
        "lon": "121.7034",
        "lat": "38.9418",
        "nlon": "121.708503",
        "nlat": "38.942737",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "445498000",
        "course": "256.8",
        "name": "MI RIM",
        "true_head": "256.8",
        "length": "96.0",
        "width": "14.0"
    }, {
        "lon": "121.7369",
        "lat": "38.9354",
        "nlon": "121.742036",
        "nlat": "38.936369",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413696770",
        "course": "54.2",
        "name": "TIAN XIANG 69",
        "true_head": "54.2",
        "length": "169.0",
        "width": "25.0"
    }, {
        "lon": "121.6105",
        "lat": "38.9341",
        "nlon": "121.615444",
        "nlat": "38.934887",
        "ship_type": "0",
        "nav_status": "9",
        "speed": "1.2",
        "mmsi": "600011568",
        "course": "134.7",
        "name": "BEI YUN 405",
        "true_head": "93.0",
        "length": "33.3",
        "width": "10.0"
    }, {
        "lon": "121.877",
        "lat": "39.0023",
        "nlon": "121.881875",
        "nlat": "39.003144",
        "ship_type": "5",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413002090",
        "course": "142.6",
        "name": "LIAN GANG 39",
        "true_head": "75.0",
        "length": "35.0",
        "width": "11.0"
    }, {
        "lon": "121.8813",
        "lat": "39.0044",
        "nlon": "121.886169",
        "nlat": "39.005241",
        "ship_type": "0",
        "nav_status": "15",
        "speed": "9.6",
        "mmsi": "413002040",
        "course": "74.6",
        "name": "LIAN GANG 36",
        "true_head": "106.0",
        "length": "35.0",
        "width": "9.8"
    }, {
        "lon": "121.6338",
        "lat": "38.9385",
        "nlon": "121.638767",
        "nlat": "38.939312",
        "ship_type": "7",
        "nav_status": "8",
        "speed": "0.0",
        "mmsi": "413202940",
        "course": "346.9",
        "name": "HAI YUN SHENG 808",
        "true_head": "238.0",
        "length": "82.0",
        "width": "19.0"
    }, {
        "lon": "121.7669",
        "lat": "38.9676",
        "nlon": "121.772027",
        "nlat": "38.968587",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413377090",
        "course": "287.5",
        "name": "ZHONG HUI 66",
        "true_head": "331.0",
        "length": "98.0",
        "width": "16.0"
    }, {
        "lon": "121.8057",
        "lat": "38.9781",
        "nlon": "121.810753",
        "nlat": "38.9790459",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413660000",
        "course": "98.0",
        "name": "AN GUO SHAN",
        "true_head": "54.0",
        "length": "199.0",
        "width": "32.0"
    }, {
        "lon": "121.7476",
        "lat": "39.0146",
        "nlon": "121.752746",
        "nlat": "39.01562",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413471970",
        "course": "194.9",
        "name": "RU YI SONG",
        "true_head": "331.0",
        "length": "180.0",
        "width": "27.0"
    }, {
        "lon": "121.7053",
        "lat": "38.9852",
        "nlon": "121.710411",
        "nlat": "38.986166",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413471440",
        "course": "237.8",
        "name": "GANG YANG",
        "true_head": "324.0",
        "length": "115.0",
        "width": "19.0"
    }, {
        "lon": "121.677",
        "lat": "38.9675",
        "nlon": "121.682055",
        "nlat": "38.968406",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413444250",
        "course": "234.0",
        "name": "XING LONG ZHOU 172",
        "true_head": "234.0",
        "length": "119.0",
        "width": "18.0"
    }, {
        "lon": "121.6291",
        "lat": "38.9588",
        "nlon": "121.634063",
        "nlat": "38.959619",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413376890",
        "course": "281.9",
        "name": "SHENG XING 8",
        "true_head": "281.9",
        "length": "50.0",
        "width": "10.0"
    }, {
        "lon": "121.6906",
        "lat": "38.9835",
        "nlon": "121.695684",
        "nlat": "38.9844409",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.3",
        "mmsi": "412207790",
        "course": "110.2",
        "name": "JIN DA SHENG",
        "true_head": "110.2",
        "length": "55.0",
        "width": "9.0"
    }, {
        "lon": "121.8057",
        "lat": "38.9781",
        "nlon": "121.810753",
        "nlat": "38.9790459",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413660000",
        "course": "98.0",
        "name": "AN GUO SHAN",
        "true_head": "54.0",
        "length": "199.0",
        "width": "32.0"
    }, {
        "lon": "121.7669",
        "lat": "38.9676",
        "nlon": "121.772027",
        "nlat": "38.968587",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413377090",
        "course": "287.5",
        "name": "ZHONG HUI 66",
        "true_head": "331.0",
        "length": "98.0",
        "width": "16.0"
    }, {
        "lon": "121.7053",
        "lat": "38.9852",
        "nlon": "121.710411",
        "nlat": "38.986166",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413471440",
        "course": "237.8",
        "name": "GANG YANG",
        "true_head": "324.0",
        "length": "115.0",
        "width": "19.0"
    }, {
        "lon": "121.6996",
        "lat": "38.9764",
        "nlon": "121.704701",
        "nlat": "38.977352",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413202970",
        "course": "224.8",
        "name": "JIA YANG 6",
        "true_head": "332.0",
        "length": "130.0",
        "width": "18.0"
    }, {
        "lon": "121.6556",
        "lat": "38.9363",
        "nlon": "121.660606",
        "nlat": "38.937146",
        "ship_type": "0",
        "nav_status": "15",
        "speed": "0.0",
        "mmsi": "412015220",
        "course": "309.0",
        "name": "HAI XUN 15009",
        "true_head": "70.0",
        "length": "9.6",
        "width": "2.3"
    }, {
        "lon": "121.7078",
        "lat": "39.0086",
        "nlon": "121.712917",
        "nlat": "39.0095839",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413806074",
        "course": "162.2",
        "name": "CHANG LIAN YOU 9",
        "true_head": "162.2",
        "length": "49.0",
        "width": "8.0"
    }, {
        "lon": "121.6544",
        "lat": "38.9662",
        "nlon": "121.659407",
        "nlat": "38.967062",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413630120",
        "course": "351.9",
        "name": "KUN LUN YOU 203",
        "true_head": "321.0",
        "length": "177.0",
        "width": "29.0"
    }, {
        "lon": "121.6498",
        "lat": "38.9657",
        "nlon": "121.654798",
        "nlat": "38.966554",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413446890",
        "course": "39.2",
        "name": "GANG SHENG 7",
        "true_head": "232.0",
        "length": "97.0",
        "width": "15.0"
    }, {
        "lon": "121.7669",
        "lat": "38.9676",
        "nlon": "121.772027",
        "nlat": "38.968587",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413377090",
        "course": "287.5",
        "name": "ZHONG HUI 66",
        "true_head": "331.0",
        "length": "98.0",
        "width": "16.0"
    }, {
        "lon": "121.8057",
        "lat": "38.9781",
        "nlon": "121.810753",
        "nlat": "38.9790459",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413660000",
        "course": "98.0",
        "name": "AN GUO SHAN",
        "true_head": "54.0",
        "length": "199.0",
        "width": "32.0"
    }, {
        "lon": "121.6498",
        "lat": "38.9657",
        "nlon": "121.654798",
        "nlat": "38.966554",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413446890",
        "course": "39.2",
        "name": "GANG SHENG 7",
        "true_head": "232.0",
        "length": "97.0",
        "width": "15.0"
    }, {
        "lon": "121.6302",
        "lat": "38.9574",
        "nlon": "121.635164",
        "nlat": "38.958219",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413230320",
        "course": "358.0",
        "name": "BO HAI GONG 9",
        "true_head": "358.0",
        "length": "89.0",
        "width": "15.0"
    }, {
        "lon": "121.6996",
        "lat": "38.9764",
        "nlon": "121.704701",
        "nlat": "38.977352",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413202970",
        "course": "224.8",
        "name": "JIA YANG 6",
        "true_head": "332.0",
        "length": "130.0",
        "width": "18.0"
    }, {
        "lon": "121.6302",
        "lat": "38.9574",
        "nlon": "121.635164",
        "nlat": "38.958219",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413230320",
        "course": "358.0",
        "name": "BO HAI GONG 9",
        "true_head": "358.0",
        "length": "89.0",
        "width": "15.0"
    }, {
        "lon": "121.7078",
        "lat": "39.0086",
        "nlon": "121.712917",
        "nlat": "39.0095839",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413806074",
        "course": "162.2",
        "name": "CHANG LIAN YOU 9",
        "true_head": "162.2",
        "length": "49.0",
        "width": "8.0"
    }, {
        "lon": "121.6302",
        "lat": "38.9574",
        "nlon": "121.635164",
        "nlat": "38.958219",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413230320",
        "course": "358.0",
        "name": "BO HAI GONG 9",
        "true_head": "358.0",
        "length": "89.0",
        "width": "15.0"
    }, {
        "lon": "121.7669",
        "lat": "38.9676",
        "nlon": "121.772027",
        "nlat": "38.968587",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413377090",
        "course": "287.5",
        "name": "ZHONG HUI 66",
        "true_head": "331.0",
        "length": "98.0",
        "width": "16.0"
    }, {
        "lon": "121.7029",
        "lat": "38.943",
        "nlon": "121.708002",
        "nlat": "38.943937",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "5.8",
        "mmsi": "413449920",
        "course": "304.9",
        "name": "XIANG SHENG HAI 9",
        "true_head": "328.0",
        "length": "49.0",
        "width": "10.0"
    }, {
        "lon": "121.6544",
        "lat": "38.9662",
        "nlon": "121.659407",
        "nlat": "38.967062",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413630120",
        "course": "351.9",
        "name": "KUN LUN YOU 203",
        "true_head": "321.0",
        "length": "177.0",
        "width": "29.0"
    }, {
        "lon": "121.6996",
        "lat": "38.9764",
        "nlon": "121.704701",
        "nlat": "38.977352",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413202970",
        "course": "224.8",
        "name": "JIA YANG 6",
        "true_head": "332.0",
        "length": "130.0",
        "width": "18.0"
    }, {
        "lon": "121.7029",
        "lat": "38.943",
        "nlon": "121.708002",
        "nlat": "38.943937",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "5.8",
        "mmsi": "413449920",
        "course": "304.9",
        "name": "XIANG SHENG HAI 9",
        "true_head": "328.0",
        "length": "49.0",
        "width": "10.0"
    }, {
        "lon": "121.7029",
        "lat": "38.943",
        "nlon": "121.708002",
        "nlat": "38.943937",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "5.8",
        "mmsi": "413449920",
        "course": "304.9",
        "name": "XIANG SHENG HAI 9",
        "true_head": "328.0",
        "length": "49.0",
        "width": "10.0"
    }, {
        "lon": "121.6544",
        "lat": "38.9662",
        "nlon": "121.659407",
        "nlat": "38.967062",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413630120",
        "course": "351.9",
        "name": "KUN LUN YOU 203",
        "true_head": "321.0",
        "length": "177.0",
        "width": "29.0"
    }, {
        "lon": "121.6297",
        "lat": "38.957",
        "nlon": "121.634664",
        "nlat": "38.957818",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413451830",
        "course": "0.0",
        "name": "ZHONG DA YOU 255",
        "true_head": "0.0",
        "length": "53.0",
        "width": "9.0"
    }, {
        "lon": "121.6798",
        "lat": "38.9823",
        "nlon": "121.684862",
        "nlat": "38.98322",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413451350",
        "course": "200.9",
        "name": "XIN MING DA 17",
        "true_head": "323.0",
        "length": "86.0",
        "width": "13.0"
    }, {
        "lon": "121.6572",
        "lat": "38.9315",
        "nlon": "121.662209",
        "nlat": "38.932346",
        "ship_type": "6",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413328380",
        "course": "145.0",
        "name": "SHENG SHENG 2",
        "true_head": "24.0",
        "length": "165.0",
        "width": "26.0"
    }, {
        "lon": "121.7053",
        "lat": "38.9852",
        "nlon": "121.710411",
        "nlat": "38.986166",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413471440",
        "course": "237.8",
        "name": "GANG YANG",
        "true_head": "324.0",
        "length": "115.0",
        "width": "19.0"
    }, {
        "lon": "121.7078",
        "lat": "39.0086",
        "nlon": "121.712917",
        "nlat": "39.0095839",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413806074",
        "course": "162.2",
        "name": "CHANG LIAN YOU 9",
        "true_head": "162.2",
        "length": "49.0",
        "width": "8.0"
    }, {
        "lon": "121.755",
        "lat": "38.9665",
        "nlon": "121.760138",
        "nlat": "38.967491",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "412207880",
        "course": "145.4",
        "name": "JIANGHAIDA68",
        "true_head": "145.4",
        "length": "96.0",
        "width": "16.0"
    }, {
        "lon": "121.7029",
        "lat": "38.943",
        "nlon": "121.708002",
        "nlat": "38.943937",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "5.8",
        "mmsi": "413449920",
        "course": "304.9",
        "name": "XIANG SHENG HAI 9",
        "true_head": "328.0",
        "length": "49.0",
        "width": "10.0"
    }, {
        "lon": "121.7476",
        "lat": "39.0146",
        "nlon": "121.752746",
        "nlat": "39.01562",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413471970",
        "course": "194.9",
        "name": "RU YI SONG",
        "true_head": "331.0",
        "length": "180.0",
        "width": "27.0"
    }, {
        "lon": "121.6798",
        "lat": "38.9823",
        "nlon": "121.684862",
        "nlat": "38.98322",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413451350",
        "course": "200.9",
        "name": "XIN MING DA 17",
        "true_head": "323.0",
        "length": "86.0",
        "width": "13.0"
    }, {
        "lon": "121.6941",
        "lat": "38.9644",
        "nlon": "121.699189",
        "nlat": "38.965335",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413327990",
        "course": "211.4",
        "name": "NING HAI 18",
        "true_head": "335.0",
        "length": "97.0",
        "width": "15.0"
    }, {
        "lon": "121.6297",
        "lat": "38.957",
        "nlon": "121.634664",
        "nlat": "38.957818",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413451830",
        "course": "0.0",
        "name": "ZHONG DA YOU 255",
        "true_head": "0.0",
        "length": "53.0",
        "width": "9.0"
    }, {
        "lon": "121.6572",
        "lat": "38.9315",
        "nlon": "121.662209",
        "nlat": "38.932346",
        "ship_type": "6",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413328380",
        "course": "145.0",
        "name": "SHENG SHENG 2",
        "true_head": "24.0",
        "length": "165.0",
        "width": "26.0"
    }, {
        "lon": "121.6302",
        "lat": "38.9574",
        "nlon": "121.635164",
        "nlat": "38.958219",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413230320",
        "course": "358.0",
        "name": "BO HAI GONG 9",
        "true_head": "358.0",
        "length": "89.0",
        "width": "15.0"
    }, {
        "lon": "121.902",
        "lat": "39.002",
        "nlon": "121.906848",
        "nlat": "39.002831",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "9.8",
        "mmsi": "477813700",
        "course": "121.4",
        "name": "SITC MOJI",
        "true_head": "126.0",
        "length": "143.0",
        "width": "23.0"
    }, {
        "lon": "121.7827",
        "lat": "38.9397",
        "nlon": "121.7878",
        "nlat": "38.940656",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "9.2",
        "mmsi": "477243300",
        "course": "13.3",
        "name": "SEREN",
        "true_head": "12.0",
        "length": "166.0",
        "width": "32.0"
    }, {
        "lon": "121.6867",
        "lat": "38.9835",
        "nlon": "121.691777",
        "nlat": "38.984434",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.2",
        "mmsi": "412433290",
        "course": "33.8",
        "name": "HUI HANG 118",
        "true_head": "340.0",
        "length": "55.0",
        "width": "9.0"
    }, {
        "lon": "121.6941",
        "lat": "38.9644",
        "nlon": "121.699189",
        "nlat": "38.965335",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413327990",
        "course": "211.4",
        "name": "NING HAI 18",
        "true_head": "335.0",
        "length": "97.0",
        "width": "15.0"
    }, {
        "lon": "121.6291",
        "lat": "38.9588",
        "nlon": "121.634063",
        "nlat": "38.959619",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413376890",
        "course": "281.9",
        "name": "SHENG XING 8",
        "true_head": "281.9",
        "length": "50.0",
        "width": "10.0"
    }, {
        "lon": "121.6798",
        "lat": "38.9823",
        "nlon": "121.684862",
        "nlat": "38.98322",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413451350",
        "course": "200.9",
        "name": "XIN MING DA 17",
        "true_head": "323.0",
        "length": "86.0",
        "width": "13.0"
    }, {
        "lon": "121.6906",
        "lat": "38.9835",
        "nlon": "121.695684",
        "nlat": "38.9844409",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.3",
        "mmsi": "412207790",
        "course": "110.2",
        "name": "JIN DA SHENG",
        "true_head": "110.2",
        "length": "55.0",
        "width": "9.0"
    }, {
        "lon": "121.6528",
        "lat": "38.9321",
        "nlon": "121.6578",
        "nlat": "38.932939",
        "ship_type": "0",
        "nav_status": "11",
        "speed": "0.0",
        "mmsi": "515609000",
        "course": "196.2",
        "name": "ZHONGSHANLVYOU1",
        "true_head": "352.0",
        "length": "86.6",
        "width": "13.5"
    }, {
        "lon": "121.8674",
        "lat": "39.0127",
        "nlon": "121.872295",
        "nlat": "39.013561",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "220417000",
        "course": "65.5",
        "name": "EMMA MAERSK",
        "true_head": "303.0",
        "length": "398.0",
        "width": "56.0"
    }, {
        "lon": "121.6798",
        "lat": "38.9823",
        "nlon": "121.684862",
        "nlat": "38.98322",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.1",
        "mmsi": "413451350",
        "course": "200.9",
        "name": "XIN MING DA 17",
        "true_head": "323.0",
        "length": "86.0",
        "width": "13.0"
    }, {
        "lon": "121.6544",
        "lat": "38.9662",
        "nlon": "121.659407",
        "nlat": "38.967062",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413630120",
        "course": "351.9",
        "name": "KUN LUN YOU 203",
        "true_head": "321.0",
        "length": "177.0",
        "width": "29.0"
    }, {
        "lon": "121.6765",
        "lat": "38.9755",
        "nlon": "121.681555",
        "nlat": "38.97641",
        "ship_type": "8",
        "nav_status": "1",
        "speed": "0.2",
        "mmsi": "413200890",
        "course": "282.1",
        "name": "RUN FENG YOU 9",
        "true_head": "282.1",
        "length": "76.0",
        "width": "12.0"
    }, {
        "lon": "121.6565",
        "lat": "38.9356",
        "nlon": "121.661508",
        "nlat": "38.936447",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413895000",
        "course": "280.6",
        "name": "de yin hai",
        "true_head": "24.0",
        "length": "131.0",
        "width": "20.0"
    }, {
        "lon": "121.6565",
        "lat": "38.9356",
        "nlon": "121.661508",
        "nlat": "38.936447",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413895000",
        "course": "280.6",
        "name": "de yin hai",
        "true_head": "24.0",
        "length": "131.0",
        "width": "20.0"
    }, {
        "lon": "121.738",
        "lat": "39.0275",
        "nlon": "121.743148",
        "nlat": "39.028526",
        "ship_type": "6",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "412900000",
        "course": "182.0",
        "name": "LONG XING DAO",
        "true_head": "149.0",
        "length": "168.0",
        "width": "25.0"
    }, {
        "lon": "121.6498",
        "lat": "38.9657",
        "nlon": "121.654798",
        "nlat": "38.966554",
        "ship_type": "8",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "413446890",
        "course": "39.2",
        "name": "GANG SHENG 7",
        "true_head": "232.0",
        "length": "97.0",
        "width": "15.0"
    }, {
        "lon": "121.6585",
        "lat": "38.9298",
        "nlon": "121.663511",
        "nlat": "38.930648",
        "ship_type": "0",
        "nav_status": "15",
        "speed": "0.0",
        "mmsi": "412002220",
        "course": "0.0",
        "name": "DALIANHAO",
        "true_head": "0.0",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.6689",
        "lat": "39.0103",
        "nlon": "121.673942",
        "nlat": "39.011216",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "1.5",
        "mmsi": "412000666",
        "course": "333.3",
        "name": "GANGDAYOU8",
        "true_head": "333.3",
        "length": "53.0",
        "width": "6.0"
    }, {
        "lon": "121.7083",
        "lat": "38.9891",
        "nlon": "121.713416",
        "nlat": "38.990073",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "7.2",
        "mmsi": "412208270",
        "course": "129.5",
        "name": "YONGSHENG1",
        "true_head": "129.5",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.8222",
        "lat": "38.9605",
        "nlon": "121.827206",
        "nlat": "38.9614059",
        "ship_type": "5",
        "nav_status": "0",
        "speed": "10.0",
        "mmsi": "412002450",
        "course": "53.0",
        "name": "LIAN GANG 28",
        "true_head": "53.0",
        "length": "36.0",
        "width": "10.0"
    }, {
        "lon": "121.6172",
        "lat": "38.9321",
        "nlon": "121.622148",
        "nlat": "38.93289",
        "ship_type": "9",
        "nav_status": "8",
        "speed": "0.0",
        "mmsi": "600012239",
        "course": "244.2",
        "name": "BEIYUN406",
        "true_head": "213.0",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.5805",
        "lat": "38.8111",
        "nlon": "121.585441",
        "nlat": "38.81182",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "8.9",
        "mmsi": "150201243",
        "course": "69.5",
        "name": "JILISAN",
        "true_head": "69.5",
        "length": "80.0",
        "width": "20.0"
    }, {
        "lon": "121.5563",
        "lat": "38.7998",
        "nlon": "121.561284",
        "nlat": "38.800545",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.1",
        "mmsi": "150201065",
        "course": "64.9",
        "name": "SHUNFENG 02",
        "true_head": "64.9",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.7434",
        "lat": "39.0201",
        "nlon": "121.748547",
        "nlat": "39.021123",
        "ship_type": "5",
        "nav_status": "8",
        "speed": "0.1",
        "mmsi": "412207620",
        "course": "137.7",
        "name": "SHUANGLIAN5",
        "true_head": "137.7",
        "length": "52.0",
        "width": "10.0"
    }, {
        "lon": "121.6998",
        "lat": "39.0131",
        "nlon": "121.704905",
        "nlat": "39.014074",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "273421240",
        "course": "271.2",
        "name": "ANTON GURIN",
        "true_head": "15.0",
        "length": "126.0",
        "width": "18.0"
    }, {
        "lon": "121.6517",
        "lat": "38.9692",
        "nlon": "121.656702",
        "nlat": "38.970059",
        "ship_type": "8",
        "nav_status": "8",
        "speed": "0.0",
        "mmsi": "413438520",
        "course": "0.0",
        "name": "YU SHUN 126",
        "true_head": "329.0",
        "length": "53.0",
        "width": "9.0"
    }, {
        "lon": "121.6979",
        "lat": "39.0176",
        "nlon": "121.703002",
        "nlat": "39.018574",
        "ship_type": "3",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "273355070",
        "course": "119.0",
        "name": "MARKUL",
        "true_head": "119.0",
        "length": "56.0",
        "width": "9.0"
    }, {
        "lon": "121.7446",
        "lat": "39.0254",
        "nlon": "121.749748",
        "nlat": "39.026427",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412418730",
        "course": "0.0",
        "name": "HAO XIANG 2",
        "true_head": "0.0",
        "length": "81.0",
        "width": "13.0"
    }, {
        "lon": "121.8921",
        "lat": "38.9966",
        "nlon": "121.896955",
        "nlat": "38.99743",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.1",
        "mmsi": "413304040",
        "course": "149.9",
        "name": "YUAN DA HE XIE",
        "true_head": "305.0",
        "length": "96.0",
        "width": "16.0"
    }, {
        "lon": "121.9485",
        "lat": "38.9239",
        "nlon": "121.953382",
        "nlat": "38.924732",
        "ship_type": "7",
        "nav_status": "0",
        "speed": "4.6",
        "mmsi": "477119000",
        "course": "327.0",
        "name": "KOTA GANTENG",
        "true_head": "288.0",
        "length": "226.0",
        "width": "32.0"
    }, {
        "lon": "121.6861",
        "lat": "39.0119",
        "nlon": "121.691179",
        "nlat": "39.01285",
        "ship_type": "9",
        "nav_status": "15",
        "speed": "0.0",
        "mmsi": "412941000",
        "course": "293.3",
        "name": "BOHAI9",
        "true_head": "293.3",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.6692",
        "lat": "38.9996",
        "nlon": "121.674242",
        "nlat": "39.00051",
        "ship_type": "2",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413357230",
        "course": "126.5",
        "name": "CHANGXINGONG1HAO",
        "true_head": "126.5",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.7001",
        "lat": "39.0106",
        "nlon": "121.705205",
        "nlat": "39.011573",
        "ship_type": "3",
        "nav_status": "0",
        "speed": "0.1",
        "mmsi": "412331109",
        "course": "116.5",
        "name": "LU QING YUAN YU 106",
        "true_head": "116.5",
        "length": "49.0",
        "width": "10.0"
    }, {
        "lon": "121.7092",
        "lat": "39.0109",
        "nlon": "121.71432",
        "nlat": "39.011887",
        "ship_type": "2",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "412021021",
        "course": "156.2",
        "name": "HJ21021",
        "true_head": "156.2",
        "length": "41.0",
        "width": "7.0"
    }, {
        "lon": "121.7489",
        "lat": "39.0147",
        "nlon": "121.754045",
        "nlat": "39.015721",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "273358980",
        "course": "125.6",
        "name": "CAPTAIN MOKEEV",
        "true_head": "241.0",
        "length": "134.0",
        "width": "18.0"
    }, {
        "lon": "121.6684",
        "lat": "39.0101",
        "nlon": "121.673441",
        "nlat": "39.011015",
        "ship_type": "8",
        "nav_status": "0",
        "speed": "0.0",
        "mmsi": "413441030",
        "course": "304.3",
        "name": "XINGLONGZHOU966",
        "true_head": "304.3",
        "length": "53.0",
        "width": "9.0"
    }, {
        "lon": "121.659",
        "lat": "38.9347",
        "nlon": "121.664013",
        "nlat": "38.9355509",
        "ship_type": "7",
        "nav_status": "15",
        "speed": "0.1",
        "mmsi": "412002240",
        "course": "0.0",
        "name": "LIANHUITUO4",
        "true_head": "0.0",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.7314",
        "lat": "38.9671",
        "nlon": "121.736538",
        "nlat": "38.968085",
        "ship_type": "7",
        "nav_status": "1",
        "speed": "0.0",
        "mmsi": "413452000",
        "course": "110.4",
        "name": "JIACHENG199",
        "true_head": "110.4",
        "length": "96.0",
        "width": "16.0"
    }, {
        "lon": "121.633",
        "lat": "38.9305",
        "nlon": "121.637965",
        "nlat": "38.931306",
        "ship_type": "3",
        "nav_status": "0",
        "speed": "0.1",
        "mmsi": "412331107",
        "course": "90.9",
        "name": "LU QING YUAN YU 102",
        "true_head": "90.9",
        "length": "49.0",
        "width": "10.0"
    }, {
        "lon": "121.5301",
        "lat": "38.8699",
        "nlon": "121.535171",
        "nlat": "38.870742",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "0.7",
        "mmsi": "123888888",
        "course": "112.3",
        "name": "19021",
        "true_head": "112.3",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.3809",
        "lat": "39.1242",
        "nlon": "121.386345",
        "nlat": "39.125456",
        "ship_type": "3",
        "nav_status": "0",
        "speed": "8.5",
        "mmsi": "412755079",
        "course": "96.4",
        "name": "LIAODAJINYU55079",
        "true_head": "96.4",
        "length": "31.0",
        "width": "6.0"
    }, {
        "lon": "121.5563",
        "lat": "38.7997",
        "nlon": "121.561284",
        "nlat": "38.800445",
        "ship_type": "0",
        "nav_status": "0",
        "speed": "51.3",
        "mmsi": "150201038",
        "course": "94.7",
        "name": "",
        "true_head": "94.7",
        "length": "0.0",
        "width": "0.0"
    }, {
        "lon": "121.5229",
        "lat": "38.8689",
        "nlon": "121.527997",
        "nlat": "38.8697609",
        "ship_type": "3",
        "nav_status": "0",
        "speed": "0.6",
        "mmsi": "847212345",
        "course": "0.0",
        "name": "JIANGHAI08",
        "true_head": "0.0",
        "length": "30.0",
        "width": "14.0"
    }, {
        "lon": "121.7011",
        "lat": "39.0164",
        "nlon": "121.706208",
        "nlat": "39.017379",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.0",
        "mmsi": "273324210",
        "course": "133.6",
        "name": "ARCTIC",
        "true_head": "14.0",
        "length": "99.0",
        "width": "16.0"
    }, {
        "lon": "121.7004",
        "lat": "39.0145",
        "nlon": "121.705506",
        "nlat": "39.015476",
        "ship_type": "7",
        "nav_status": "5",
        "speed": "0.2",
        "mmsi": "273356610",
        "course": "289.6",
        "name": "PROLIV LONGA",
        "true_head": "15.0",
        "length": "172.0",
        "width": "23.0"
    }],
    "token": ""
};
// 创建shipLayer对象
var shipLayer = new HDMap.ship();
// 添加图层切换控件
HDMap.control.layers(baseLayersForlayersControl, {'显示船舶位置': shipLayer}).addTo(map);

/*************（3）测量控件************/
HDMap.control.measure().addTo(map);

/*************（3）绘制控件************/
drawnItems = HDMap.featureGroup().addTo(map);
map.addControl(new HDMap.Control.Draw({
    edit: {featureGroup: drawnItems}
}));
map.on('draw:created', function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
});

/*************（4）搜索控件************/
function HDMapLocalSearch(text, callResponse) {
    var searchOption = new HDMap.LocalSearchOptions(url+':8009/', callResponse);
    var searchSetting = new HDMap.LocalSearchSetting(text, 0, 10);
    var searcher = new HDMap.LocalSearch(searchOption);
    searcher.searchInCity(searchSetting, cityName, parseInt(searchType));
}
function formatJSON(result) {
    var json = {},
        key, loc, disp = [];
    var poiList = result.getPoiList();
    for (var i in poiList) {
        key = poiList[i].name;

        loc = HDMap.latLng(poiList[i].point.lat, poiList[i].point.lng);

        json[key] = loc;	//key,value format
    }

    return json;
}
map.addControl(new HDMap.Control.Search({
    sourceData: HDMapLocalSearch,
    formatData: formatJSON,
    markerLocation: true,
    autoType: false,
    autoCollapse: true,
    minLength: 2,
    zoom: 15,
    initial: false
}));

/*************（4）小地图控件************/
var baseLayersForlayersControlCopy = {
    "融合图": HDMap.tileLayer(mixMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
    "陆图": HDMap.tileLayer(landMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18}),
    "海图": HDMap.tileLayer(seaMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
    "卫星图": HDMap.tileLayer(satMapUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 17}),
    "明亮风格": HDMap.tileLayer(brightMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "绘画风格": HDMap.tileLayer(galleryMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "老地图": HDMap.tileLayer(oldMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "蓝图": HDMap.tileLayer(blueMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "北半球图": HDMap.tileLayer(northMapUrl, {attribution: hdmapAttrib, tileSize: 512, zoomOffset: -1, minZoom: 3, maxZoom: 18}),
    "OSM": HDMap.tileLayer(osmLayerUrl, {attribution: hdmapAttrib, minZoom: 1, maxZoom: 18})
};
var miniMap = new HDMap.Control.MiniMap(baseLayersForlayersControlCopy["融合图"], {toggleDisplay: true}).addTo(map);

/**********************************************************************************
 ********************************4、事件注册************************************
 **********************************************************************************/

/*************（1）全局事件************/
// 绑定缩放事件，根据缩放比例重新绘制船型
map.on('zoomend', function (e) {
    if (!_shipLayerLoaded) {
        shipLayer.remove();
        shipLayer.setJsonData(map, data);
        shipLayer.addTo(map);
    }
});
// 底图改变触发事件
map.on('baselayerchange', function (e) {
    switch (e._url) {
        case baseLayersForlayersControl["融合图"]._url:
            baseLayers.landGrid.remove();
            baseLayers.seaGrid.remove();
            baseLayers.mixGrid.addTo(map);
            miniMap.changeLayer(baseLayersForlayersControlCopy["融合图"]);
            break;
        case baseLayersForlayersControl["陆图"]._url:
            baseLayers.mixGrid.remove();
            baseLayers.seaGrid.remove();
            baseLayers.landGrid.addTo(map);
            miniMap.changeLayer(baseLayersForlayersControlCopy["陆图"]);
            break;
        case baseLayersForlayersControl["海图"]._url:
            baseLayers.mixGrid.remove();
            baseLayers.landGrid.remove();
            baseLayers.seaGrid.addTo(map);
            miniMap.changeLayer(baseLayersForlayersControlCopy["海图"]);
            break;
        case baseLayersForlayersControl["卫星图"]._url:
            miniMap.changeLayer(baseLayersForlayersControlCopy["卫星图"]);
            break;
        case baseLayersForlayersControl["明亮风格"]._url:
            miniMap.changeLayer(baseLayersForlayersControlCopy["明亮风格"]);
            break;
        case baseLayersForlayersControl["绘画风格"]._url:
            miniMap.changeLayer(baseLayersForlayersControlCopy["绘画风格"]);
            break;
        case baseLayersForlayersControl["老地图"]._url:
            miniMap.changeLayer(baseLayersForlayersControlCopy["老地图"]);
            break;
        case baseLayersForlayersControl["蓝图"]._url:
            miniMap.changeLayer(baseLayersForlayersControlCopy["蓝图"]);
            break;
        case baseLayersForlayersControl["北半球图"]._url:
            miniMap.changeLayer(baseLayersForlayersControlCopy["北半球图"]);
            break;
        case baseLayersForlayersControl["OSM"]._url:
            miniMap.changeLayer(baseLayersForlayersControlCopy["OSM"]);
            break;

    }
});

/*************（2）utfgridLayer事件************/
var gridPopup = HDMap.popup();
baseLayers.mixGrid.on('click', clickGrid);
baseLayers.landGrid.on('click', clickGrid);
baseLayers.seaGrid.on('click', clickGrid);
function clickGrid(e) {
    if (e.data != null) {
        if (e.data.name_chn == "告警区") {
            gridPopup.setContent(e.data.detail_chn);
            gridPopup.setLatLng(e.latlng).openOn(map);
        } else {
            var searchOption = new HDMap.LocalSearchOptions(url+':8009/', searchDetilePopup);
            var searchSettion = new HDMap.LocalSearchSetting(e.data.name_chn, 0, 10);
            var searcher = new HDMap.LocalSearch(searchOption);
            searcher.searchNearby(searchSettion, geometryDecode(e.data.geometry), 100, 0);
            gridPopup.setLatLng(geometryDecode(e.data.geometry));
            gridPopup.setContent("<b>" + e.data.name_chn + "</b>");
            gridPopup.openOn(map);
        }
    }
}
function searchDetilePopup(data) {
    var poiList = data.getPoiList();
    var cityList = data.getCityList();
    var totalNum = data.getTotalPoiNum();
    var curIndex = data.getCurrentPageIndex();
    var pageSize = data.getPageSize();
    var totalPageNum = data.getTotalPageNum();
    // searcher.gotoPage(1);

    if (data._status == 0) {
        gridPopup.setContent("<b>" + poiList[0].name + "</b><br>电话：" + poiList[0].telephone + "<br>地址：" + poiList[0].address);
    } else {
    }
    gridPopup.openOn(map);
}
function geometryDecode(geometry) {
    var latlngfromgeo = geometry.replace("POINT(", "").replace(")", "").split(" ");
    return HDMap.latLng(latlngfromgeo[1], latlngfromgeo[0]);
}

