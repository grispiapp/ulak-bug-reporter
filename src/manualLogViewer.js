import t from './translations.js';

const popupTemplate = `
	<div id="orhunManualLogViewer">
		<textarea readonly>LOG_TEXT</textarea>
		<button id="manualLogViewerCloseBtn">${t('close')}</button>
	</div>
`;

export default function showLogPopup(logs) {
	const popupHtml = popupTemplate.replace('LOG_TEXT', logs);
	document.body.insertAdjacentHTML('beforeend', popupHtml);

	manualLogViewerCloseBtn.onclick = () => orhunManualLogViewer.remove();
}