import React, { Component } from 'react';
import { css } from 'react-emotion';
// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 150px;
`

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading' style={{height: '100%'}}>
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={100}
          color={'#639b93'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default Loader
