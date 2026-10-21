// Reproductor web para los videos armados sobre rc-kit (todos menos Channel Manager).
// Mismo contrato que player.jsx: RacimoVideo.mount(el, {scenes, tweaks, vertical, pieza}) → {set(t), total, width, height}.
function RacimoVideoRoot({ scenes, tweaks, vertical, handle, Piece }) {
  const derived = React.useMemo(() => ccDerive(scenes), [scenes]);
  const [t, setT] = React.useState(0);
  handle.set = setT;
  const W = vertical ? 1080 : 2560, H = vertical ? 1920 : 1048;
  const value = {
    T: ccWarp(derived, t), CUES: derived.table, time: t,
    duration: derived.total, authoredTotal: derived.authoredTotal, playing: false,
  };
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: RC.NEGRO, fontFamily: 'Inter, sans-serif' }}>
      <CompositionContext.Provider value={value}>
        <Piece T={value.T} C={value.CUES} total={value.authoredTotal} tweaks={tweaks} W={W} H={H} v={vertical} />
      </CompositionContext.Provider>
    </div>
  );
}

window.RacimoVideo = {
  mount(el, { scenes, tweaks, vertical, pieza }) {
    const Piece = window[pieza].Piece;
    const handle = { set: null };
    const root = ReactDOM.createRoot(el);
    ReactDOM.flushSync(() => root.render(<RacimoVideoRoot scenes={scenes} tweaks={tweaks} vertical={vertical} handle={handle} Piece={Piece} />));
    const total = ccDerive(scenes).total;
    let last = -1;
    return {
      total, width: vertical ? 1080 : 2560, height: vertical ? 1920 : 1048,
      set(t) {
        t = Math.max(0, Math.min(total - 0.001, t));
        if (Math.abs(t - last) < 0.0005 || !handle.set) return;
        last = t;
        ReactDOM.flushSync(() => handle.set(t));
      },
      unmount() { root.unmount(); },
    };
  },
};
