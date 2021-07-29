function init() {
    document.removeEventListener('DOMContentLoaded', init);
    var pointStyle0 = new ol.style.Style({

        image: new ol.style.Circle({
          radius:7,
          fill: new ol.style.Fill({color: 'yellow'}),
          stroke: new ol.style.Stroke({
              color: [255 ,0, 0], width:1
          })
        })
      });
    var avmLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: 'EPSG:4326'
            }),
            url: '../static/avm.geojson',
            attributions: [
                new ol.Attribution({
                    html: 'World Capitals © Natural Earth'
                })
            ]
        }),
        style: pointStyle0
    });
    var pointStyle1 = new ol.style.Style({

        image: new ol.style.Circle({
          radius:7,
          fill: new ol.style.Fill({color: 'blue'}),
          stroke: new ol.style.Stroke({
              color: [255, 0, 0], width:1
          })
        })
      });
    var metroLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: 'EPSG:4326'
            }),
            url: '../static/metro.geojson',
            attributions: [
                new ol.Attribution({
                    html: 'World Capitals © Natural Earth'
                })
            ]
        }),
        style: pointStyle1
    });

    var pointStyle2 = new ol.style.Style({

        image: new ol.style.Circle({
          radius:7,
          fill: new ol.style.Fill({color: 'pink'}),
          stroke: new ol.style.Stroke({
              color: [255, 0, 0], width:1
          })
        })
      });
    var okullarLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: 'EPSG:4326'
            }),
            url: '../static/okullar.geojson',
            attributions: [
                new ol.Attribution({
                    html: 'World Capitals © Natural Earth'
                })
            ]
        }),
        style: pointStyle2
    });

    var pointStyle3 = new ol.style.Style({

        image: new ol.style.Circle({
          radius:7,
          fill: new ol.style.Fill({color: 'red'}),
          stroke: new ol.style.Stroke({
              color: [255, 0, 0], width:1
          })
        })
      });
    var hastaneLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: 'EPSG:4326'
            }),
            url: '../static/hastaneler.geojson',
            attributions: [
                new ol.Attribution({
                    html: 'World Capitals © Natural Earth'
                })
            ]
        }),
        style: pointStyle3
    });

    var sinirlarLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON({
                defaultDataProjection: 'EPSG:4326'
            }),
            url: '../static/sinirlar.geojson',
            attributions: [
                new ol.Attribution({
                    html: 'World Capitals © Natural Earth'
                })
            ]
        })
    });
    var baseLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    var layersArray = [baseLayer, avmLayer,  metroLayer, okullarLayer, hastaneLayer, sinirlarLayer]
    var map = new ol.Map({
        target: 'map',
        layers: layersArray,
        controls: [
            //Define the default controls
            new ol.control.Zoom(),
            new ol.control.Rotate(),
            new ol.control.Attribution(),
            //Define some new controls
            new ol.control.ZoomSlider(),
            new ol.control.MousePosition(),
            new ol.control.ScaleLine(),
            new ol.control.OverviewMap()
        ],
        interactions: ol.interaction.defaults().extend([
            new ol.interaction.Select({
                layers: [sinirlarLayer]
            })
        ]),
        view: new ol.View({
            center: [3664572.4379372844, 4853052.63222308],
            zoom: 13
        })
    });
    map.on('click', function (evt) {
        var pixel = evt.pixel;
        var coord = evt.coordinate;
        console.log("Click Coordinates:----->", coord);
        var coord1 = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');
        console.log("epsg:4326 ----->", coord1);
        var extent = sinirlarLayer.getSource().getExtent();
        console.log(extent)
        console.log("contains", ol.extent.containsCoordinate(extent, coord))
        if (ol.extent.containsCoordinate(extent, coord)){
            
            
            console.log("extent ----- ", ol.proj.transformExtent(sinirlarLayer.getSource().getExtent(), 'EPSG:3857', 'EPSG:4326'))
        var okulFeature = okullarLayer.getSource().getClosestFeatureToCoordinate(coord);
        var avmFeature = avmLayer.getSource().getClosestFeatureToCoordinate(coord);
        var hastaneFeature = hastaneLayer.getSource().getClosestFeatureToCoordinate(coord);
        var metroFeature = metroLayer.getSource().getClosestFeatureToCoordinate(coord);
        console.log("okul: ", okulFeature);
        console.log("avm: ", avmFeature);
        console.log("hastane: ", hastaneFeature);
        console.log("metro: ", metroFeature);
        var okuluzaklik = okulFeature["B"]["geometry"]["u"];
        var okularray = [okuluzaklik[0], okuluzaklik[1]];
        var okulcoord = ol.proj.transform(okularray, 'EPSG:3857', 'EPSG:4326');
        var okuldist = getDistance(coord1,okulcoord);
        console.log("okulFeature -----> ", okuldist);
        var avmuzaklik = avmFeature["B"]["geometry"]["u"];
        var avmarray = [avmuzaklik[0], avmuzaklik[1]];
        var avmcoord = ol.proj.transform(avmarray, 'EPSG:3857', 'EPSG:4326');
        var avmdist = getDistance(coord1,avmcoord);
        console.log("avmFeature -----> ", avmdist);
        var hastaneuzaklik = hastaneFeature["B"]["geometry"]["u"];
        var hastanearray = [hastaneuzaklik[0], hastaneuzaklik[1]];
        var hastanecoord = ol.proj.transform(hastanearray, 'EPSG:3857', 'EPSG:4326');
        var hastanedist = getDistance(coord1,hastanecoord);
        console.log("hastaneFeature -----> ", hastanedist);
        var metrouzaklik = metroFeature["B"]["geometry"]["u"];
        var metroarray = [metrouzaklik[0], metrouzaklik[1]];
        var metrocoord = ol.proj.transform(metroarray, 'EPSG:3857', 'EPSG:4326');
        var metrodist = getDistance(coord1,metrocoord);
        console.log("metroFeature --> ", metrodist);
        $('#DisColl').val(okuldist);
        $('#DisHos').val(hastanedist);
        $('#DisMall').val(avmdist);
        $('#DisMetro').val(metrodist);
        }
        else{
            alert("Geçersiz alana tıkladınız.")
        }
    });

}

function deg2rad(deg)
{
    return deg * (Math.PI/180);
}

function getDistance(pair1, pair2)
{
    const [lat1, lon1] = pair1, [lat2, lon2] = pair2;
    const R = 6371; // Radius of the earth in km.

    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    // Return distance in km.
    var sonuc = R * c * 1000;
    sonuc = sonuc.toFixed(0);
    return sonuc;
}

document.addEventListener('DOMContentLoaded', init);