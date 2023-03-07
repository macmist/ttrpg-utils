import React, {useEffect, useRef} from 'react';

type Point = {
    x: number,
    y: number,
    color: string
}
interface MapRendererProps {
    width?: number,
    height?: number,
    points?: Array<Point>
}

const MapRenderer = (props: MapRendererProps) => {
    const {width, height, points} = props
    const canvasRef = useRef<HTMLCanvasElement>(null)

    function drawPixel(context: CanvasRenderingContext2D, x: number, y: number, color: string) {
        console.log(x, y, color)
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx) {
            ctx.fillStyle = '#000'
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            if (points) {
                points.forEach(point => {
                    drawPixel(ctx, point.x, point.y, point.color)
                })
            }
        }
    }, [points  ])
    return <canvas ref={canvasRef} width={width || 200} height={height || 200}></canvas>
}

export default MapRenderer
