document.addEventListener('DOMContentLoaded', () => {
    const sideNameElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNameElems);
    const toolTipElems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(toolTipElems);
});