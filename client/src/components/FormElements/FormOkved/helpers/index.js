export const rebuildState = (items) => {
  return items.map((item) => ({
    ...item,
    checked: false,
    childrens: item?.childrens ? rebuildState(item?.childrens) : null,
  }))
}

export const getCheckedItems = (items) => {
  const list = []

  items.forEach((item) => {
    if (item.checked) {
      list.push({title: item.title, value: item.value})
    }

    if (item?.childrens) {
      const inner = getCheckedItems(item.childrens)
      if (inner.length > 0) {
        list.push(...inner)
      }
    }
  })

  return list
}

export const getCheckedItem = (items, val) => {
  let list = [];
  items.forEach((item) => {

    if (item.value === val) {
      list.push(item);
    }
    if (item?.childrens) {
      const inner = getCheckedItem(item.childrens, val)
      if (inner.length > 0) {
        list.push(...inner)
      }
    }

  })
  return list
}

export const getCheckedValue = (items) => {
  const values = []

  items.forEach((item) => {
    values.push(item.value)
  })

  return values
}

export const changeCheckedState = (items, val) => {
  return items.map((item) => {
    item.checked = false

    if (val.includes(item.value)) {
      item.checked = !item.checked
    }

    if (item?.childrens) {
      changeCheckedState(item.childrens, val)
    }

    return item
  })
}

export const mergeArrayOfObjects = (saveItems, items, selector = 'value') => {
  items.forEach((item) => {
    const foundIndex = saveItems.findIndex((si) => si[selector] === item[selector])

    if (foundIndex >= 0) {
      saveItems.splice(foundIndex, 1, item)
    } else {
      saveItems.push(item)
    }
  })

  return saveItems
}