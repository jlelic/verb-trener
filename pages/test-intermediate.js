import {generateTest} from './api/test-generator'
import Test from '../compoments/test'

export async function getServerSideProps(context) {
    return {
        props: {test: await generateTest(10, 100)}, // will be passed to the page component as props
    }
}

export default function BasicTest(props) {
    return <Test test={props.test}/>
}
