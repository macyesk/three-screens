const friends = ['Will', 'Macy', 'Alex', 'Sam'];
const games = [
  { id: 1, date: '2026-10-08', opponent: 'Portland Pines', owner: 'Alex', waitlist: ['Will', 'Macy'], marquee: true },
  { id: 2, date: '2026-10-13', opponent: 'Boise Outlaws', owner: null, waitlist: [] },
  { id: 3, date: '2026-10-17', opponent: 'Seattle Breakers', owner: 'Macy', waitlist: [] },
  { id: 4, date: '2026-10-23', opponent: 'Denver Ridge', owner: 'Alex', waitlist: ['Sam'], marquee: true },
  { id: 5, date: '2026-10-29', opponent: 'Austin Armadillos', owner: 'Will', waitlist: ['Macy'] },
  { id: 6, date: '2026-11-04', opponent: 'Madison Frost', owner: null, waitlist: [] },
  { id: 7, date: '2026-11-10', opponent: 'Portland Pines', owner: 'Sam', waitlist: [], marquee: true },
  { id: 8, date: '2026-11-15', opponent: 'Sacramento Gold', owner: 'Alex', waitlist: [] },
  { id: 9, date: '2026-11-21', opponent: 'Boise Outlaws', owner: null, waitlist: [] },
  { id: 10, date: '2026-11-27', opponent: 'Denver Ridge', owner: null, waitlist: [], marquee: true },
  { id: 11, date: '2026-12-03', opponent: 'Seattle Breakers', owner: 'Macy', waitlist: ['Sam'] },
  { id: 12, date: '2026-12-09', opponent: 'Madison Frost', owner: null, waitlist: [] },
];
const app = document.querySelector('#app');
let notice = '';
const counts = name => ({ total: games.filter(g => g.owner === name).length, marquee: games.filter(g => g.owner === name && g.marquee).length });
const avatar = name => `<span class="avatar ${name === 'Will' ? 'you' : ''}" aria-hidden="true">${name.slice(0, 1)}</span>`;
const personName = name => `<div class="person-name">${avatar(name)}<span>${name}${name === 'Will' ? ' <span class="you-label">YOU</span>' : ''}</span></div>`;
const badge = game => game.marquee ? '<span class="badge">★ Marquee</span>' : '';
const dateObject = game => new Date(`${game.date}T12:00:00`);
const dateText = game => dateObject(game).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const footer = () => '<footer><span>SUMMIT HOCKEY · SHARED SEASON, FAIR SHARE.</span><span>Interactive demo · Fictional schedule · Changes reset on refresh</span></footer>';
const back = () => '<a class="back" href="#overview">← Season Overview</a>';
function overview() {
  const open = games.filter(g => !g.owner).length;
  app.innerHTML = `<header class="hero"><h1>See who's got what —<br><span>and make sure everyone gets a fair share of the season.</span></h1><div class="meta"><span class="team">Summit Hockey</span><span class="dot">/</span><span>2026–27 season split</span><span class="user">${avatar('Will')} Viewing as <strong>Will</strong></span></div></header>
  <section class="snapshot" aria-labelledby="fairness-title"><div class="section-heading"><h2 id="fairness-title">Your group's split</h2><a href="#fairness" class="text-link">See fairness breakdown ↗</a></div><div class="people">${friends.map(name => { const c = counts(name); return `<div class="person">${personName(name)}<div class="person-count"><strong>${c.total}</strong> games claimed</div><div class="marquee-count">★ ${c.marquee} marquee ${c.marquee === 1 ? 'game' : 'games'}</div></div>`; }).join('')}</div></section>
  <section aria-labelledby="schedule-title"><div class="section-heading schedule-heading"><div><h2 id="schedule-title">The season ahead</h2><p class="subtle">12 home games · ${open} open to claim</p></div><span class="legend"><span class="star">★</span> Marquee matchup</span></div><div class="schedule">${games.map(g => `<button class="game-row" data-game="${g.id}" aria-label="${g.opponent}, ${dateText(g)}, ${g.owner ? `claimed by ${g.owner}` : 'open'}${g.marquee ? ', marquee game' : ''}"><span class="date"><span>${dateObject(g).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span><strong>${dateObject(g).getDate()}</strong></span><span><span class="opponent"><span class="vs">vs</span>${g.opponent}</span><span class="game-meta">${dateObject(g).toLocaleDateString('en-US', { weekday: 'short' })} · 7:00 PM ${badge(g)}</span></span><span class="row-status"><span class="status ${!g.owner ? 'open' : g.owner === 'Will' ? 'mine' : ''}">${g.owner ? `Claimed by ${g.owner}` : 'Open to claim'}</span>${g.waitlist.length ? `<span class="claim-sub">${g.waitlist.length} on waitlist</span>` : ''}</span><span class="arrow" aria-hidden="true">↗</span></button>`).join('')}</div></section>${footer()}`;
}
function detail(g) {
  const position = g.waitlist.indexOf('Will');
  app.innerHTML = `${back()}<header><p class="eyebrow">Summit vs</p><h1 class="screen-title">${g.opponent}</h1><p class="subtle">${dateText(g)} · 7:00 PM · Summit Arena</p><div style="margin-top:14px">${badge(g)}</div></header>${notice ? `<div class="notice" role="status">${notice}</div>` : ''}<div class="detail-grid"><section class="card"><h2>This game's claim</h2><span class="status ${!g.owner ? 'open' : 'mine'}">${g.owner ? 'Claimed' : 'Open'}</span>${g.owner ? `<div class="owner">${avatar(g.owner)}<div><strong>${g.owner === 'Will' ? 'You have this game' : `${g.owner} has this game`}</strong><p class="subtle">This claim counts toward ${g.owner === 'Will' ? 'your' : `${g.owner}'s`} season total.</p></div></div>` : '<p class="subtle" style="margin-top:18px">Make this one yours. The first person to claim gets the game.</p>'}
  ${!g.owner ? '<button class="primary" data-action="claim">Claim This Game</button>' : g.owner === 'Will' ? '<button class="secondary" data-action="drop">Give Up Claim</button>' : position >= 0 ? `<div class="notice">You're #${position + 1} on the waitlist.</div><button class="secondary" data-action="leave">Leave Waitlist</button>` : '<button class="primary" data-action="join">Join Waitlist</button>'}
</section><section class="card"><h2>Next in line</h2>${g.waitlist.length ? `<ol>${g.waitlist.map(n => `<li>${n}${n === 'Will' ? ' (you)' : ''}</li>`).join('')}</ol>` : '<p class="subtle">No one on the waitlist yet.</p>'}<p class="subtle" style="margin-top:22px">If the holder gives up their claim, the first person in line gets the game automatically.</p><p class="subtle" style="margin-top:12px">Only confirmed claims count toward the split.</p></section></div>${footer()}`;
}
function fairness() {
  const totals = friends.map(n => counts(n).total);
  const max = Math.max(1, ...totals);
  const marqueeMax = Math.max(1, ...friends.map(n => counts(n).marquee));
  const spread = Math.max(...totals) - Math.min(...totals);
  app.innerHTML = `${back()}<header><p class="eyebrow">Every game counts. The big ones, too.</p><h1 class="screen-title">A fair share for everyone.</h1><p class="subtle">See how the season is shared across all four friends.</p></header><section class="card summary" aria-label="Claim totals by person"><div class="summary-head"><span>YOUR GROUP</span><span>ALL GAMES</span><span>★ MARQUEE GAMES</span></div>${friends.map(n => { const c = counts(n); return `<div class="summary-row">${personName(n)}<div class="bar-value" aria-label="${c.total} total games"><div class="track" aria-hidden="true"><div class="fill" style="width:${c.total / max * 100}%"></div></div><strong>${c.total}</strong></div><div class="bar-value" aria-label="${c.marquee} marquee games"><div class="track" aria-hidden="true"><div class="fill gold" style="width:${c.marquee / marqueeMax * 100}%"></div></div><strong>${c.marquee}</strong></div></div>`; }).join('')}<div class="summary-note">${spread === 0 ? 'Everyone has the same number of games.' : `There’s a ${spread}-game gap between the highest and lowest totals.`} ${games.filter(g => !g.owner).length} games are still open, including ${games.filter(g => !g.owner && g.marquee).length} marquee games.</div><p class="subtle" style="margin-top:18px">Marquee games are included in all-game totals. Waitlists don’t count. Each column uses its own scale.</p></section>${footer()}`;
}
function render() {
  const hash = location.hash.slice(1);
  const game = games.find(g => hash === `game/${g.id}`);
  if (game) detail(game); else if (hash === 'fairness') fairness(); else overview();
  document.title = `${game ? game.opponent : hash === 'fairness' ? 'Fairness Summary' : 'Season Overview'} · Summit Hockey`;
}
app.addEventListener('click', event => {
  const gameButton = event.target.closest('[data-game]');
  if (gameButton) { location.hash = `game/${gameButton.dataset.game}`; return; }
  const action = event.target.closest('[data-action]')?.dataset.action;
  const g = games.find(g => location.hash === `#game/${g.id}`);
  if (!action || !g) return;
  if (action === 'claim' && !g.owner) { g.owner = 'Will'; notice = 'Game claimed! This game now counts toward your fair share.'; }
  else if (action === 'join' && g.owner !== 'Will' && !g.waitlist.includes('Will')) { g.waitlist.push('Will'); notice = `You joined the waitlist at #${g.waitlist.length}.`; }
  else if (action === 'leave') { g.waitlist = g.waitlist.filter(n => n !== 'Will'); notice = 'You left the waitlist.'; }
  else if (action === 'drop' && g.owner === 'Will') { const previous = g.owner; g.owner = g.waitlist.shift() || null; notice = `${previous} gave up the claim. ${g.owner ? `${g.owner === 'Will' ? 'You were' : `${g.owner} was`} automatically promoted from the waitlist. The fairness totals have updated.` : 'This game is now open to claim.'}`; }
  render();
  document.querySelector('#announcement').textContent = notice;
  const message = app.querySelector('.notice');
  if (message) { message.tabIndex = -1; message.focus(); }
});
window.addEventListener('hashchange', () => { notice = ''; render(); window.scrollTo(0, 0); const heading = app.querySelector('h1'); heading.tabIndex = -1; heading.focus({ preventScroll: true }); });
render();
