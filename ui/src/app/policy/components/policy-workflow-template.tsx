import { Page, SlidingPanel } from 'argo-ui';
import * as React from 'react';
import { Button } from '../../shared/components/button';

export const PolicyWorkflowTemplate = () => {

    const [data, setData]: any = React.useState()
    const [edit, setEdit]: any = React.useState()

    const getPolicies = async () => {
        let response = await fetch('http://localhost:8181/v1/policies/policies/codecoverage.rego')
        let results = await response.json();
        setData(results.result);
    }

    React.useEffect(() => {
        getPolicies()
    }, [])

    return (
        <Page
            title='Manage Policies'
            toolbar={{
                breadcrumbs: [
                    { title: 'Policy Management', path: '/policy' },
                ],
                actionMenu: {
                    items: [
                        {
                            title: 'Edit Policy',
                            iconClassName: 'fa fa-plus',
                            action: () => setEdit(true)
                        }
                    ]
                }
            }}>
            <div className='' style={{
                border: '1px solid #dfdfdf',
                margin: 15,
                display: 'flex',
                maxWidth: 400,
                position: 'relative',
                padding: 10,
                background: 'white',
                borderRadius: 6,
            }}>
                <div className='columns small-10 xlarge-10 card p-4'
                    dangerouslySetInnerHTML={{ __html: data?.raw }}
                />
            </div>

            <SlidingPanel isShown={edit} onClose={() => setEdit(false)}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                }}>
                    <textarea defaultValue={data?.raw} rows={10} style={{ border: '1px solid #dfdfdf', margin: '10px 0', padding: 10 }}>
                    </textarea>
                    <div className='columns small-2'>
                        <button
                            key='submit'
                            onClick={() => setEdit(false)}
                            className='argo-button argo-button--base'>
                            Submit
                        </button>
                    </div>

                </div>
            </SlidingPanel>
        </Page>
    )
}

