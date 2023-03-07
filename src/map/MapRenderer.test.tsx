import MapRenderer from './MapRenderer'
import {render, screen} from "@testing-library/react";
import React from 'react';


it('should render a canvas', () => {
    const {container} = render(<MapRenderer/>)
    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
})
