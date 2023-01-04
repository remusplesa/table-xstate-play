import { Box, Center, Container } from "@mantine/core";

export const Shell = (props: any) => (
  <div style={{ width: "100vw" }}>
    <Container
      size="sm"
      style={{ marginRight: "auto", marginLeft: "auto", minWidth: 250 }}
    >
      <Center>
        <h2>Todos app</h2>
      </Center>
      <Box
        sx={(theme) => ({
          borderRadius: theme.radius.sm,
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: 15,
        })}
      >
        {props.children}
      </Box>
    </Container>
  </div>
);
