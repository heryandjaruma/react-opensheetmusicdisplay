import React, { Component } from 'react';
import { OpenSheetMusicDisplay as OSMD, TransposeCalculator } from 'opensheetmusicdisplay';

class OpenSheetMusicDisplay extends Component {
    constructor(props) {
      super(props);
      this.state = { dataReady: false };
      this.osmd = undefined;
      this.divRef = React.createRef();
    }
  
    setupOsmd() {
      const options = {
        autoResize: this.props.autoResize !== undefined ? this.props.autoResize : true,
        drawTitle: this.props.drawTitle !== undefined ? this.props.drawTitle : true,
      }
      this.osmd = new OSMD(this.divRef.current, options);
      this.osmd.TransposeCalculator = new TransposeCalculator();

      this.osmd.load(this.props.file).then(() => {
        this.osmd.Sheet.Transpose = 2; // Set the transpose after the sheet is loaded
        this.osmd.updateGraphic()
        this.osmd.render();
      });
      
    }
    
    resize() {
      this.forceUpdate();
    }
    
    componentWillUnmount() {
      window.removeEventListener('resize', this.resize)
    }
    
    componentDidUpdate(prevProps) {
      if (this.props.drawTitle !== prevProps.drawTitle) {
        this.setupOsmd();
      } else {
        this.osmd.load(this.props.file).then(() => this.osmd.render());
      }
      window.addEventListener('resize', this.resize)
    }
    
    // Called after render
    componentDidMount() {
      this.setupOsmd()
    }
  
    render() {
      return (<div ref={this.divRef} />);
    }
  }

  export default OpenSheetMusicDisplay;
