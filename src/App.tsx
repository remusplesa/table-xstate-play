import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core';
import { Shell } from './components/Shell'
import { Dashboard } from './components/Dashboard'
import { MachineProvider } from './machines';

const queryClient = new QueryClient()

function App() {

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
      }}
    >
      <MachineProvider>
        <QueryClientProvider client={queryClient}>
          <Shell>
            <Dashboard />
          </Shell>
        </QueryClientProvider>
      </MachineProvider>
    </MantineProvider>
  )
}

export default App
