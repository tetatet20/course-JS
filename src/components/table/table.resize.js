import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  // const $parent = $resizer.$el.parentNode !BAD!
  // const $parent = $resizer.$el.closest('.column') !BAD!
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  const type = $resizer.data.resize
  const sideProp = type === 'col'? 'bottom' :'right'
  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  document.onmousemove = (e) => {
  if ( type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      // $parent.css({width: value + 'px'})
      $resizer.css({right: -delta + 'px'})
  } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      // $parent.css({height: value + 'px'})
      $resizer.css({bottom: -delta + 'px'})
  }
}


  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      cells.forEach((el) => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })
  }
}
