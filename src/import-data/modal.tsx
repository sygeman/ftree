import { useDisclosure } from "@mantine/hooks";
import { TextInput, Button, Group, Modal, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

export const ImportDataModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      url: "https://www.theplumtreeapp.com/public/641f24449a150cba09f92d5b",
    },
    validate: {
      url: (value) => (/public\/([^/]+)/.test(value) ? null : "Invalid url"),
    },
  });

  const fetchData = async (id: string) => {
    const query = await fetch(
      `https://www.theplumtreeapp.com/api/published/${id}`,
      {
        mode: "no-cors",
      }
    );
    console.log(query);
    const data = await query.json();
    console.log(data);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Import Data">
        <Box maw={500} mx="auto">
          <form
            onSubmit={form.onSubmit(({ url }) => {
              const id = url.match(/public\/([^/]+)/)?.[1];
              if (!id) return;
              fetchData(id);
            })}
          >
            <TextInput
              withAsterisk
              label="URL"
              placeholder="https://www.theplumtreeapp.com/public/641f24449a150cba09f92d5b"
              {...form.getInputProps("url")}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Button onClick={open}>Import</Button>
    </>
  );
};
