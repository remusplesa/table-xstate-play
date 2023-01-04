import { useQuery } from '@tanstack/react-query';
import { Table } from './Table';
import { MachineContext } from '../machines';
import { useEffect } from 'react';
import { Modal } from '@mantine/core';
import { useContext } from 'react';

export const Dashboard = () => {
  const { current, send } = useContext(MachineContext);

  const { isLoading, error, data } = useQuery<ResponseTodos>({
    queryKey: ['todos'],
    queryFn: () => fetch('https://dummyjson.com/todos').then(res => res.json())
  })

  useEffect(() => {
    if (data) send({ type: 'SUCCESS', data })
    if (error) send({ type: 'ERROR', error })
  }, [isLoading, send])

  if (isLoading) return (<h2>Loading... ⏳</h2>)

  if (error) return (<h2>An error has occured 😥</h2>)

  return (
    <div>
      {current.matches('modalView') && <Modal
        opened={true}
        onClose={() => send('DEFAULT_VIEW')}
        title="Introduce yourself!"
      >
        <pre>
          {JSON.stringify(current.context.focus, null, 2)}
        </pre>
      </Modal>}
      <Table tableData={current.context.todos} />
    </div>
  )
}