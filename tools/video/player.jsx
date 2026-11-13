// Reproductor web de los videos de Racimo: el mismo árbol del video de Claude Design,
// sin la barra ni los ajustes, con el tiempo manejado desde la página (scroll o reloj).
// Cada cuadro sale del tiempo exacto, así que ir para atrás es igual que ir para adelante.
function RacimoVideoRoot({ scenes, tweaks, vertical, handle }) {
  const derived = React.useMemo(() => ccDerive(scenes), [scenes]);
  const [t, setT] = React.useState(0);
  handle.set = setT;
  VERT = vertical; W = vertical ? 1080 : 2560; H = vertical ? 1920 : 1048;
  const value = {
    T: ccWarp(derived, t), CUES: derived.table, time: t,
    duration: derived.total, authoredTotal: derived.authoredTotal, playing: false,
  };
  return (
    <div style={{ position: 'relative', width: W, height: H, overflow: 'hidden', background: NEGRO }}>
      <CompositionContext.Provider value={value}>
        <Piece tweaks={tweaks} />
      </CompositionContext.Provider>
    </div>
  );
}

window.RacimoVideo = {
  mount(el, { scenes, tweaks, vertical }) {
    const handle = { set: null };
    const root = ReactDOM.createRoot(el);
    ReactDOM.flushSync(() => root.render(<RacimoVideoRoot scenes={scenes} tweaks={tweaks} vertical={vertical} handle={handle} />));
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
