/* Replace null destinations with the exact approved URLs when publishing. */
const destinations = {chat: null, post: null, vip: null, platforms: null, pairs: {}, social: {}};
const dialog = document.querySelector('#details');
function showDetails(title, copy, url, label = 'Contact support') {
  document.querySelector('#detail-title').textContent = title;
  document.querySelector('#detail-copy').textContent = copy;
  const link = document.querySelector('#detail-link');
  link.href = url || 'mailto:support@BitDelta.Pro';
  link.textContent = label;
  dialog.showModal();
}
function navigateOrExplain(url, title, copy) {
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
  else showDetails(title, copy);
}
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.action === 'chat') {
    if (destinations.chat) navigateOrExplain(destinations.chat);
    else showDetails('Contact BitDelta', 'For assistance, email support@bitdelta.com. The design does not include a live-chat destination.', 'mailto:support@bitdelta.com', 'Email support');
  } else if (button.dataset.action === 'platforms') navigateOrExplain(destinations.platforms, 'Explore Trading Platforms', 'The original design does not include the trading-platforms destination. Contact support for platform details.'); else if (button.dataset.action === 'vip') navigateOrExplain(destinations.vip, 'More Perks. More VIP.', 'Exclusive VIP bonus benefits, designed for retail traders on BitDelta Pro. The design does not include the offer URL.'); else navigateOrExplain(destinations.post, 'Best post of the week', 'Was the recent AI infrastructure sell-off a warning sign, or a market overreaction? The design does not include the post URL.');
}));
document.querySelectorAll('[data-detail]').forEach(button => button.addEventListener('click', () => navigateOrExplain(destinations.pairs[button.dataset.detail], button.dataset.detail, 'This is a placeholder trading pair in the original design. A specific market has not been supplied.')));
document.querySelectorAll('[data-channel]').forEach(button => button.addEventListener('click', () => navigateOrExplain(destinations.social[button.dataset.channel], button.dataset.channel, 'The original design does not include a destination for this community channel.')));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
