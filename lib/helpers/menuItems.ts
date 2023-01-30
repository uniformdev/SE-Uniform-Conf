import { projectMapClient } from "lib/projectMapClient";
import getConfig from "next/config";

const {
    serverRuntimeConfig: { projectMapId },
  } = getConfig();
  
export async function GetMenuItems() {
    const tree = await projectMapClient.getSubtree({
      projectMapId, 
      depth: 1
    });
  
    if (tree?.children?.length) {
      let childItems: Array<{ name: string, url: string }> = [];
  
      tree.children.forEach(childItem => {
        childItems.push({ name: childItem.name, url: childItem.path });
      });
  
      return childItems;
    }
  
    return [];
  }