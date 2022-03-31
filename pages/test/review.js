import {generateReviewTest} from '/lib/test-generator'
import Test from '/compoments/test'
import getLoggedInUser from '../../lib/get-logged-in-user'

export async function getServerSideProps(context) {
    const user = await getLoggedInUser(context.req) || null
    const test = await generateReviewTest(10, user)
    return {
        props: { test, user },
    }
}

export default function Review(props) {
    return <Test {...props}/>
}
