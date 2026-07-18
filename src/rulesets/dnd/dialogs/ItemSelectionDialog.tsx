import Button from "@/components/library/Button";
import WindowDialog from "@/components/library/dialogs/WindowDialog";
import Table from "@/components/library/Table";
import { SearchItems_5e } from "@/rulesets/5e/services/itemsService";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { formatCostDnd } from "../scripts/utils";
import useItems from "@/rulesets/5e/hooks/useItems";

interface Props {
  itemsHook: ReturnType<typeof useItems>
  search: SearchItems_5e | null
  filtersLocked: boolean
  onClose: (value: Item_5e | null) => void
}


function ItemSelectionDialog({ itemsHook, search, filtersLocked, onClose }: Props) {
  const [selectedItem, setSelectedItem] = useState<Item_5e | null>(null);


  return createPortal(
    <WindowDialog
      open
      setOpen={() => onClose(null)}
      title="Pick an Item"
      width="60vw"
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
        <Button
          variants={['blue', 'thin']}
          onClick={() => onClose(selectedItem)}
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
            {itemsHook.items.map((item) => {
              return (
                <tr key={item.id} onClick={() => setSelectedItem(item)}>
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

/* eslint-disable */
export function selectItem(itemsHook: ReturnType<typeof useItems>, search?: SearchItems_5e, filtersLocked = false): Promise<Item_5e | null> {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);

    function handleClose(item: Item_5e | null) {
      root.unmount();
      container.remove();
      resolve(item);
    }

    root.render(
      <ItemSelectionDialog
        itemsHook={itemsHook}
        search={search ?? null}
        filtersLocked={filtersLocked}
        onClose={handleClose}
      />
    );
  });
}