import { Polyline } from "@react-google-maps/api";
import React from "react";
import { addPolyEvent } from "./PathUtils";
import { PolyProps } from "./Polygon";

export interface PolylineProps extends PolyProps {
    style: {
        strokeColor : string;
        strokeOpacity : number;
        strokeWeight : number;
        icons?:IconsProps[];
    }; 
    lineType: string;  
}

export interface IconsProps {
    icon: IconProps,
    offset: string,
    repeat: string
}

export interface IconProps {
 
    path: string | google.maps.SymbolPath,
    fillOpacity?: number,
    strokeOpacity?: number,
    scale: number,
    strokeWeight: number

}

export interface PolylineState {
    polyline: google.maps.Polyline;
    center: google.maps.LatLng;
}

export default class PolylineComponent extends React.Component<PolylineProps,PolylineState> {
    constructor(props: PolylineProps) {
        super(props);
        this.state = {
            polyline: {} as google.maps.Polyline,
            center: {} as google.maps.LatLng
        };
    }
  
    onClick = (e:any) => {
        if (e){

        }
    };
    onInfoWindowLoad = () => {
        console.log('infoWindow: ');
    }
    onInfoWindowClose = () => {

    };
    onLoad = (polyline: google.maps.Polyline) => {  

        const polylineBounds = new google.maps.LatLngBounds();
        const newPaths = polyline.getPath();

        newPaths.forEach(function(element){polylineBounds.extend(element)})

        // store center of polyline in polyline state
        let center = polylineBounds.getCenter();

        this.setState({
            polyline : polyline,
            center: center
        });

        //Add a dynamic listener to the polygon or polygon click event for the NewEdit screen
        if (this.props.editable && this.props.coordinatesStringAttrUpdate) {
            addPolyEvent(polyline,newPaths,this.props.paths,this.props.coordinatesStringAttrUpdate);
        }
    };
    shouldComponentUpdate(prevProps:any) {
        if (prevProps.name == this.props.name && prevProps.position == this.props.center){
            console.debug('polyline ' + this.props.name + ' NOT updated!');
            return false;
        } else {
            console.debug('polyline ' + this.props.name + ' updated!');
            console.debug('old/new name: '+ prevProps.name + ' / ' + this.props.name + 'old/new position: '+ prevProps.position + ' / ' + this.props.center  );
            return true;
        }
    }
    render() {  

        return (
            <Polyline
                onLoad={this.onLoad}
                path={this.props.paths}
                options={this.props.style}
                editable={this.props.editable}
                visible={this.props.visible}
                onClick={this.props.onClick}
            >
            </Polyline>
        );
    }
  }



