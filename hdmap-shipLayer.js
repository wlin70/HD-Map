var _map,_geojson,_shipSelected,_lon,_lat,_height,_width,_shipLayerLoaded = true;
HDMap.Ship = HDMap.Layer.extend({
	//initialize : function(){
	//	this._map=null;
	//	this._geojson=null;
	//	this._shipSelected=null;
	//	this._lon=null;
	//	this._lat=null;
	//	this._height=null;
	//	this._width=null;
	//	this.shipLayerLoaded = true;
	//},

	setJsonData:function(map,data){
		var cbList = this._cbList = data.details;
		_map = map;
		var cbJson;
		var cbJsonArr = [];
		for (var i=0;i<cbList.length;i++) {
			if (parseInt(cbList[i].true_head) >= 360) {
				cbList[i].true_head = 0;
			}
			cbJson = this.drawnShip(
				_map.getZoom(),
				new HDMap.LatLng(cbList[i].nlat, cbList[i].nlon),
				parseFloat(cbList[i].width)/1000,
				parseFloat(cbList[i].length)/1000,
				parseFloat((cbList[i].true_head!==''&&cbList[i].true_head!==undefined)?cbList[i].true_head:cbList[i].course),
				parseFloat(cbList[i].speed),
				cbList[i].ship_type,
				cbList[i].name,
				cbList[i].mmsi);
			cbJsonArr.push(cbJson);
		}

		var geojsonSample = {
			"type": "FeatureCollection",
			"features": cbJsonArr
		};
		_geojson = this._geojson = HDMap.geoJson(geojsonSample, {
			style: function (feature) {
				return {
					color: feature.properties.color,
					weight: feature.properties.weight,
					fillColor:feature.properties.fillColor,
					fillOpacity:feature.properties.fillOpacity,

					name:feature.properties.name,
					mmsi:feature.properties.mmsi,
					speed:feature.properties.speed,
					lon:feature.properties.lon,
					lat:feature.properties.lat
				};
			},

			onEachFeature: function (feature, layer) {
				var lonLat = changeLonLat(feature.properties.lon,feature.properties.lat);
				var popupText = "<table>"+
					"<tr>"+
					"<td>船名</td>"+
					"<td>"+feature.properties.name+"</td>"+
					"</tr>"+
					"<tr>"+
					"<td>mmsi</td>"+
					"<td>"+feature.properties.mmsi+"</td>"+
					"</tr>"+
					"<tr>"+
					"<td>速度</td>"+
					"<td>"+feature.properties.speed+"</td>"+
					"</tr>"+
					"<tr>"+
					"<td>坐标</td>"+
					"<td>"+lonLat.lonDfm+"，"+lonLat.latDfm+"</td>"+
					"</tr>"+
					"</table>";
				layer.bindPopup(popupText);
				layer.addEventListener('click',function(e){
					shipSelected(feature.properties.lon, feature.properties.lat, feature.properties.height, feature.properties.width);
				});
			}
		});
	},
	onAdd : function(map){
		this.setJsonData(map,data);
		_map.removeLayer(this._geojson);
		_map.addLayer(this._geojson);
		if(_lon !== undefined || _lat !== undefined || _height !== undefined || _width !== undefined){
			shipSelected(_lon,_lat,_height,_width);
		}
		if(_shipLayerLoaded){
			_shipLayerLoaded = false;
			_map.on('click',function(e){
				if(_shipSelected !== undefined){
					_map.removeLayer(_shipSelected);
				}
			});
		}
	},
	onRemove : function(){
		_map.removeLayer(this._geojson);
		if(_shipSelected !== undefined){
			_map.removeLayer(_shipSelected);
		}
		_shipLayerLoaded = true;
	},
	shipSelected : function(lon,lat,height,width) {
		_lon = lon;
		_lat = lat;
		_height = height;
		_width = width;
		if(_shipSelected !== undefined){
			_map.removeLayer(_shipSelected);
		}
		var length;
		var radius = height>=width?height/2:width/2;
		if (((_map.getZoom() == 14 && height >= 0.2) || (_map.getZoom() == 15 && height >= 0.1) || (_map.getZoom() == 16 && height >= 0.05) || (_map.getZoom() == 17 && height >= 0.03) || (_map.getZoom() == 18 && height >= 0.01)) && height/width > 0.5) {
			length = radius/(20037508*2/Math.pow(2,_map.getZoom())/256/1000)+4;
		} else {
			length = 11 + 3;
		}
		var temp = 7;
		var pointCenter = _map.latLngToContainerPoint(HDMap.latLng(lat, lon));
		var point1 = HDMap.point(pointCenter.x - length, pointCenter.y-length);
		var point2 = HDMap.point(pointCenter.x + length, pointCenter.y-length);
		var point3 = HDMap.point(pointCenter.x + length, pointCenter.y+length);
		var point4 = HDMap.point(pointCenter.x - length, pointCenter.y+length);
		var forceShipJson = [{
			"type": "Feature",
			"geometry": {
				"type": "MultiLineString",
				"coordinates": [[[_map.containerPointToLatLng(HDMap.point(point1.x,point1.y+temp)).lng,_map.containerPointToLatLng(HDMap.point(point1.x,point1.y+temp)).lat],[_map.containerPointToLatLng(point1).lng, _map.containerPointToLatLng(point1).lat],[_map.containerPointToLatLng(HDMap.point(point1.x+temp,point1.y)).lng,_map.containerPointToLatLng(HDMap.point(point1.x+temp,point1.y)).lat]],
					[[_map.containerPointToLatLng(HDMap.point(point2.x-temp,point2.y)).lng,_map.containerPointToLatLng(HDMap.point(point2.x-temp,point2.y)).lat],[_map.containerPointToLatLng(point2).lng, _map.containerPointToLatLng(point2).lat],[_map.containerPointToLatLng(HDMap.point(point2.x,point2.y+temp)).lng,_map.containerPointToLatLng(HDMap.point(point2.x,point2.y+temp)).lat]],
					[[_map.containerPointToLatLng(HDMap.point(point3.x,point3.y-temp)).lng,_map.containerPointToLatLng(HDMap.point(point3.x,point3.y-temp)).lat],[_map.containerPointToLatLng(point3).lng, _map.containerPointToLatLng(point3).lat],[_map.containerPointToLatLng(HDMap.point(point3.x-temp,point3.y)).lng,_map.containerPointToLatLng(HDMap.point(point3.x-temp,point3.y)).lat]],
					[[_map.containerPointToLatLng(HDMap.point(point4.x+temp,point4.y)).lng,_map.containerPointToLatLng(HDMap.point(point4.x+temp,point4.y)).lat],[_map.containerPointToLatLng(point4).lng, _map.containerPointToLatLng(point4).lat],[_map.containerPointToLatLng(HDMap.point(point4.x,point4.y-temp)).lng,_map.containerPointToLatLng(HDMap.point(point4.x,point4.y-temp)).lat]]
				]
			},
			"properties": {

			}
		}];
		var geoJsonOneShip = {
			"type": "FeatureCollection",
			"features": forceShipJson
		};
		_shipSelected = HDMap.geoJson(geoJsonOneShip, {
			style: function (feature) {
				return {
					color: '#ff0000',
					weight: 2,
					opacity:5
				};
			},
		});

		_map.addLayer(_shipSelected);
	},
	drawnShip : function(zoom,lnglat,width,height,angle,speed,shipType,shipName,mmsi) {
		//angle = 0;
		var cbJson;
		//对船速线的处理
		var speedLineLength;
		//对船舶型号(颜色)的描画
		var color = "#ff00ff";
		switch(shipType) {
			case "4": color = "#f6e500";//黄
				break;
			case "5": color = "#00ffff";//靛
				break;
			case "6": color = "#0000ff";//蓝
				break;
			case "7": color = "#00ff00";//绿
				break;
			case "8": color = "#ff0000";//红
				break;
			case "9": color = "#ff00ff";//亮紫
				break;
		}
		var latLng1,latLng2,latLng3,latLng4,latLng5,latLng6,latLng7,latLng8,latLng9,latLng10;
        console.log(zoom)
		if (((zoom == 14 && height >= 0.2) || (zoom == 15 && height >= 0.1) || (zoom == 16 && height >= 0.05) || (zoom == 17 && height >= 0.03) || (zoom == 18 && height >= 0.01)) && height/width > 2 && (height > 0 && height < 0.5) && (width > 0 && width < 0.2)) {
			if (speed === 0) {
				speedLineLength = 0;
			} else if (speed > 0 && speed <= 5) {
				speedLineLength = 0.2 * height;
			} else if (speed > 5 && speed <= 10) {
				speedLineLength = 0.4 * height;
			} else if (speed > 10 && speed <= 15) {
				speedLineLength = 0.6 * height;
			} else if (speed > 15 && speed <= 20) {
				speedLineLength = 0.8 * height;
			} else if (speed > 20) {
				speedLineLength = 1 * height;
			}
			//对船形的描画
			//验证船的宽度是否小于最小船宽
			//求在该级别下的最小船宽,屏幕上的最小船宽设置为5像素
			var minWidth = 5*20037508*2/Math.pow(2,_map.getZoom())/256/1000;//单位为米
			if (width < minWidth) width = minWidth;
			//求中心点屏幕坐标
			var pointCenter = _map.latLngToContainerPoint(HDMap.latLng(lnglat.lat, lnglat.lng));
			//转换成中心点地理坐标，目的为减小误差
			lnglat = _map.containerPointToLatLng(pointCenter);
			latLng1 = this.calculateCoordinate(lnglat, speedLineLength + 0.5 * height , angle);
			latLng2 = this.calculateCoordinate(lnglat, 0.5 * height , angle);
			latLng3 = this.calculateCoordinate(lnglat, Math.sqrt(4/9*height*4/9*height + 0.25*width*0.25*width) , Math.atan(0.25*width/(4/9*height))*180/Math.PI + angle);
			latLng4 = this.calculateCoordinate(lnglat, Math.sqrt(1/3*height*1/3*height + 0.5*width*0.5*width) , Math.atan(0.5*width/(1/3*height))*180/Math.PI + angle);
			latLng5 = this.calculateCoordinate(lnglat, Math.sqrt(5/12*height*5/12*height + 0.5*width*0.5*width) , 180 - (Math.atan(0.5*width/(5/12*height))*180/Math.PI) + angle);
			latLng6 = this.calculateCoordinate(lnglat, Math.sqrt(0.5*height*0.5*height + 1/3*width*1/3*width) , 180 - (Math.atan(1/3*width/(0.5*height))*180/Math.PI) + angle);
			latLng7 = this.calculateCoordinate(lnglat, Math.sqrt(0.5*height*0.5*height + 1/3*width*1/3*width) , 180 + (Math.atan(1/3*width/(0.5*height))*180/Math.PI) + angle);
			latLng8 = this.calculateCoordinate(lnglat, Math.sqrt(5/12*height*5/12*height + 0.5*width*0.5*width) , 180 + (Math.atan(0.5*width/(5/12*height))*180/Math.PI) + angle);
			latLng9 = this.calculateCoordinate(lnglat, Math.sqrt(1/3*height*1/3*height + 0.5*width*0.5*width) , 360 - (Math.atan(0.5*width/(1/3*height))*180/Math.PI) + angle);
			latLng10 = this.calculateCoordinate(lnglat, Math.sqrt(4/9*height*4/9*height + 0.25*width*0.25*width) , 360 - (Math.atan(0.25*width/(4/9*height))*180/Math.PI) + angle);
			cbJson = {
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [[[latLng1.lng,latLng1.lat],[latLng2.lng,latLng2.lat],[latLng3.lng,latLng3.lat],[latLng4.lng,latLng4.lat],[latLng5.lng,latLng5.lat],[latLng6.lng,latLng6.lat],[latLng7.lng,latLng7.lat],[latLng8.lng,latLng8.lat],[latLng9.lng,latLng9.lat],[latLng10.lng,latLng10.lat],[latLng2.lng,latLng2.lat]]]
				},
				"properties": {
					"color": '#000000',
					"fillColor": color,
					"weight":1,
					"fillOpacity": 1,
					"opacity": 1,
					"lon":lnglat.lng,
					"lat": lnglat.lat,
					"name": shipName,
					"mmsi": mmsi,
					"speed": speed,
					"height": height,
					"width": width
				}
			};
		} else {
			//如果不符合条件，画默认船形
			if (speed === 0) {
				speedLineLength = 0;
			} else if (speed > 0 && speed <= 5) {
				speedLineLength = 0.2 * 23;
			} else if (speed > 5 && speed <= 10) {
				speedLineLength = 0.4 * 23;
			} else if (speed > 10 && speed <= 15) {
				speedLineLength = 0.6 * 23;
			} else if (speed > 15 && speed <= 20) {
				speedLineLength = 0.8 * 23;
			} else if (speed > 20) {
				speedLineLength = 1 * 23;
			}
			//获得中心点的屏幕坐标
			var _pointCenter = _map.latLngToContainerPoint(HDMap.latLng(lnglat.lat, lnglat.lng));
			var point1 = HDMap.point(_pointCenter.x, _pointCenter.y-11-speedLineLength);
			var point2 = HDMap.point(_pointCenter.x, _pointCenter.y-11);
			var point3 = HDMap.point(_pointCenter.x+5, _pointCenter.y+11);
			var point4 = HDMap.point(_pointCenter.x-5, _pointCenter.y+11);
			latLng1 = _map.containerPointToLatLng(point1);
			latLng2 = _map.containerPointToLatLng(point2);
			latLng3 = _map.containerPointToLatLng(point3);
			latLng4 = _map.containerPointToLatLng(point4);
			latLng1 = this.calculateCoordinate(lnglat, lnglat.distanceTo(latLng1)/1000 , angle);
			latLng2 = this.calculateCoordinate(lnglat, lnglat.distanceTo(latLng2)/1000 , angle);
			latLng3 = this.calculateCoordinate(lnglat, lnglat.distanceTo(latLng3)/1000 , 151.4281218577 + angle);
			latLng4 = this.calculateCoordinate(lnglat, lnglat.distanceTo(latLng4)/1000 , 208.5718781423 + angle);
			cbJson = {
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [[[latLng1.lng,latLng1.lat],[latLng2.lng,latLng2.lat],[latLng3.lng,latLng3.lat],[latLng4.lng,latLng4.lat],[latLng2.lng,latLng2.lat]]]
				},
				"properties": {
					"color": '#000000',
					"fillColor": color,
					"weight":1,
					"fillOpacity": 1,
					"stroke": "#555555",
					"opacity": 1,
					"stroke-width": 1,
					"lon":lnglat.lng,
					"lat": lnglat.lat,
					"name": shipName,
					"mmsi": mmsi,
					"speed": speed,
					"height": height,
					"width": width
				}
			};
		}
		return cbJson;
	},
	calculateCoordinate : function(lnglat, distance, angle){
		//计算点的经纬度坐标
		var calc_point;
		var latitude,longitude;

		var kEarthRadius = 6378.137;

		//纬度对应的弧度值
		var lat_radian;

		//调整角度到有效范围内
		if (angle >= 360){
			angle = angle - 360;
		}
		if (angle < 0){
			angle = angle + 360;
		}

		//方位角为90度时
		if (angle == 90){
			latitude = lnglat.lat;
			lat_radian = lnglat.lat*Math.PI/180;
			longitude = lnglat.lng + distance * 180 / (Math.PI * kEarthRadius * Math.cos(lat_radian));

			//是否跨越经度180度线
			if (longitude < -180){
				longitude = longitude + 360;
			} else if (longitude > 180) {
				longitude = longitude - 360;
			}
		}
		//方位角为270度时
		else if (angle == 270){
			latitude = lnglat.lat;
			lat_radian = lnglat.lat*Math.PI/180;
			longitude = lnglat.lng - distance * 180 / (Math.PI * kEarthRadius * Math.cos(lat_radian));

			//是否跨越经度180度线
			if (longitude < -180){
				longitude = longitude + 360;
			} else if (longitude > 180) {
				longitude = longitude - 360;
			}
		}
		//方位角为其他度数时
		else{
			//方位角对应的弧度值
			var radian = angle*Math.PI/180;
			//纬度间距
			var dis_lat = distance * Math.cos(radian);
			//纬度差(度)
			var diff_lat = dis_lat * 360 / (2 * Math.PI * kEarthRadius);
			latitude = diff_lat + lnglat.lat;
			var middle_lat = (lnglat.lat + latitude) * 0.5;
			middle_lat = middle_lat*Math.PI/180;
			longitude = diff_lat * Math.tan(radian) / Math.cos(middle_lat) + lnglat.lng;
		}

		//是否跨越经度180度线
		if (longitude < -180){
			longitude = longitude + 360;
		} else if (longitude > 180){
			longitude = longitude - 360;
		}

		//返回被计算的经纬度坐标
		calc_point= new HDMap.LatLng(latitude, longitude);
		return calc_point;
	}
});
HDMap.ship= function (map, data) {
	return new HDMap.Ship(map, data);
};
var changeLonLat = function(lon,lat){
	var lonDu = parseInt(lon);
	var lonFen1 = (parseFloat(lon) - lonDu)*60;
	var lonFen = parseInt(lonFen1);
	var lonMiao = (lonFen1 - lonFen)*60;
	var lonDfm = lonDu+"°"+lonFen+"′"+lonMiao.toFixed(2)+"″E";

	var latDu = parseInt(lat);
	var latFen1 = (parseFloat(lat) - latDu)*60;
	var latFen = parseInt(latFen1);
	var latMiao = (latFen1 - latFen)*60;
	var latDfm = latDu+"°"+latFen+"′"+latMiao.toFixed(2)+"″N";
	return {"lonDfm":lonDfm,"latDfm":latDfm};
};