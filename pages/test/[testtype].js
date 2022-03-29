import {generateTest} from '/lib/test-generator'
import Test from '/compoments/test'
import getLoggedInUser from '../../lib/get-logged-in-user'

const testTypes = {
    beginner: [10, 20],
    advanced: [10, 100],
    intermediate: [10, 1000],
    expert: [10],
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
