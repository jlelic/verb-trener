import {generateTest} from '/lib/test-generator'
import Test from '/compoments/test'
import getLoggedInUser from '../../lib/get-logged-in-user'

const testTypes = {
    basic: [10, 20],
    beginner: [10, 100],
    intermediate: [10, 500],
    advanced: [10, 1000],
    expert: [10, null],
}


export async function getServerSideProps(context) {
    const testParams = testTypes[context.query.testtype] || [3, 10]
    const user = await getLoggedInUser(context.req) || null
    const test = await generateTest(...testParams, user)
    return {
        props: {test, user}, // will be passed to the page component as props
    }
}

export default function TestB1(props) {
    return <Test {...props}/>
}
