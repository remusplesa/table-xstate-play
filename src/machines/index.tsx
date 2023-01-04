import { createContext } from "react";
import { createMachine, interpret, assign } from "xstate";
import { useMachine } from "@xstate/react";

export const GeneralStateMachine = createMachine<{
  todos: Todo[];
  focus: Todo | null;
  errors: string[];
}>(
  {
    initial: "loading",
    context: {
      todos: [],
      focus: null,
      errors: [],
    },
    states: {
      loading: {
        on: {
          SUCCESS: {
            actions: ["setTodos"],
            target: "defaultView",
          },
          ERROR: {
            actions: ["setError"],
            target: "error",
          },
        },
      },
      error: {},
      defaultView: {
        on: {
          DETAIL_VIEW: {
            actions: ["setFocus"],
            target: "detailView",
          },
          MODAL_VIEW: {
            actions: ["setFocus"],
            target: "modalView",
          },
          ERROR: {
            target: "error",
          },
        },
      },
      detailView: {
        on: {
          DEFAULT_VIEW: {
            target: "defaultView",
          },
        },
      },
      modalView: {
        on: {
          DEFAULT_VIEW: {
            target: "defaultView",
          },
        },
      },
    },
  },
  {
    actions: {
      setTodos: assign({ todos: (_ctx, event) => event.data.todos }),
      setFocus: assign({ focus: (_ctx, event) => event.todo }),
      setError: assign({ errors: (_ctx, event) => [..._ctx.errors, event.error] }),
    },
  }
);

export const MachineContext = createContext<{ current: any; send: any }>({
  current: null,
  send: null,
});

export const MachineProvider = ({ children }: any) => {
  const [current, send] = useMachine(GeneralStateMachine);

  return (
    <MachineContext.Provider value={{ current, send }}>
      {children}
    </MachineContext.Provider>
  );
};
