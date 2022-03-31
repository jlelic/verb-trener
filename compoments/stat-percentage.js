export default function StatPercentage(props) {
    const { value, colorBy } = props
    if (typeof value !== 'number') {
        return ''
    }
    console.log(value, colorBy)
    return <span style={{ color: `hsl(${120 * (colorBy || value)},100%,36%)` }}>{Math.floor(10000 * value) / 100}%</span>
}
