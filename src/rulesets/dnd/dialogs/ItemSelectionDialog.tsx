import Button from "@/components/library/Button";
import WindowDialog from "@/components/library/dialogs/WindowDialog";
import Table from "@/components/library/Table";
import { searchItems, SearchItems_5e } from "@/rulesets/5e/services/itemsService";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { formatCostDnd } from "../scripts/utils";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

interface Props {
  search: SearchItems_5e
  amount: number
  onClose: (value: Item_5e[]) => void
}


function ItemSelectionDialog({ search, amount, onClose }: Props) {
  const [selectedItems, setSelectedItems] = useState<Item_5e[]>([]);

  const { data: items = [] } = useQuery<Item_5e[]>({
    queryKey: ['items', search],
    queryFn: () => searchItems(search)
  });

  const onClickSelectItem = (item: Item_5e) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
     if (selectedItems.length >= amount) {
        setSelectedItems([...selectedItems.slice(1), item]);
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };


  return createPortal(
    <WindowDialog
      open
      setOpen={() => onClose([])}
      title="Pick an Item"
      width="60vw"
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
        <Button
          variants={['blue', 'thin']}
          onClick={() => onClose(selectedItems)}
          disabled={selectedItems.length < amount}
        >
          Submit
        </Button>
      </div>

      <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rarity</th>
              <th>Type</th>
              <th>Lbs</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr
                  key={item.id}
                  style={selectedItems.includes(item) ? { color: 'var(--blue-light-3)', cursor: 'pointer' } : { cursor: 'pointer' }}
                  onClick={() => onClickSelectItem(item)}
                >
                  <td>{ item.name }</td>
                  <td>{ item.rarity }</td>
                  <td>{ item.type }</td>
                  <td>{ item.lbs }</td>
                  <td>{ formatCostDnd(item.cost) }</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </WindowDialog>,
    document.body
  );
}


export function selectItem(search: SearchItems_5e, amount?: number): Promise<Item_5e[]> {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);

    function handleClose(item: Item_5e[]) {
      root.unmount();
      container.remove();
      resolve(item);
    }

    const queryClient = new QueryClient();
    const queryOptions = {
      refetchOnWindowFocus: false,
      keepPreviousData: true
    };
    queryClient.setDefaultOptions({ queries: queryOptions });

    root.render(
      <QueryClientProvider client={queryClient}>
        <ItemSelectionDialog
          search={search ?? null}
          amount={amount ?? 1}
          onClose={handleClose}
        />
      </QueryClientProvider>
    );
  });
}