import { useTheme } from 'styled-components'

export default function R34Icon(props: { size: number; className?: string }) {
  const theme = useTheme()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.size}
      height={props.size}
      viewBox='0 0 12.7 12.7'
      className={props.className}
    >
      <g transform='translate(0,-284.3)'>
        <circle
          id='path18'
          cx='6.3499999'
          cy='290.65002'
          fill='none'
          stroke={theme.colors.accentColor}
          strokeWidth='0.50848764'
          strokeMiterlimit='4'
          strokeDasharray='none'
          strokeOpacity='1'
          r='6.0957561'
        />
        <text
          fontStyle='normal'
          fontWeight='normal'
          fontSize='8.3113203px'
          fontFamily='sansSerif'
          letterSpacing='0px'
          wordSpacing='0px'
          fill={theme.colors.accentColor}
          fillOpacity='1'
          x='2.1363549'
          y='289.02704'
          id='text4533'
          transform='scale(0.98538224,1.0148346)'
        >
          <tspan
            id='tspan4531'
            x='2'
            y='289.1'
            fontStyle='normal'
            fontVariant='normal'
            fontWeight='300'
            fontStretch='normal'
            fontFamily='Calibri'
            fill={theme.colors.accentColor}
            fillOpacity='1'
          >
            34
          </tspan>
        </text>
      </g>
    </svg>
  )
}
