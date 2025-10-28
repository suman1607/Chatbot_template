
(function () {
  // --- Preact Micro-library (Bundled In) ---
  // To keep this self-contained, a minimal Preact setup is included.
  // In a real build process, this would be handled by a bundler.
  const { h, render, Component, useState, useCallback, useMemo } = (() => {
    let V = {
      h(t, p) {
        let n, i, l, s = ''
        for (l in p) 'class' == l && p[l] && (s = p[l])
        let c = []
        for (l = arguments.length; l-- > 2;) c.unshift(arguments[l])
        p.children = c
        if (t && t.defaultProps) for (l in t.defaultProps) void 0 === p[l] && (p[l] = t.defaultProps[l])
        if (n = p.ref) delete p.ref
        if (i = p.key) delete p.key
        return { type: t, props: p, key: i, ref: n, _class: s }
      },
    }
    function S(n, t) {
      for (let o in t) n[o] = t[o]
      return n
    }
    let T = {}
    function C(n, t) {
      let o,
        r,
        i = t && t.slice(),
        l = {}
      for (r = n.length; r--;) l[n[r]] = n[r]
      for (r = t.length; r--;)
        null == (o = t[r])
          ? i.splice(r, 1)
          : null != o.key
          ? i[r] = o
          : null != (o = i[r]) && (l[o.key] = void 0)
      for (r = n.length; r--;)
        null != (o = n[r]) &&
          null != l[o.key] &&
          (i[r] = o)
      return i
    }
    function D(n, t) {
      return (
        null != n &&
        'boolean' != typeof n &&
        ('function' == typeof n
          ? n(t)
          : (n.current = t))
      )
    }
    let E = 'undefined' != typeof Promise ? Promise.resolve() : null,
        I = 0
    function L(n, t, o, r, i, l, s) {
      if (null == n || 'boolean' == typeof n) return D(o, null), null
      let u
      if ('string' == typeof n || 'number' == typeof n)
        return (
          t && null !== t.nodeType && t.splitText !== void 0 && t.parentNode === o
            ? t.nodeValue != n && (t.nodeValue = n)
            : ((t = document.createTextNode(n)), D(o, t)),
          t
        )
      let c = n.type,
        a = t && t.S
      if ('function' == typeof c) {
        if (
          ((E || o.S) && o.S.S
            ? E
              ? o.S.S.push(n)
              : o.S.S(n)
            : ((u = c.prototype && c.prototype.render), (a = a || new c(n.props, r)))),
          (a.props = n.props),
          (a.context = r),
          u
        ) {
          a.S = a
          let e = a.render(a.props, a.state, a.context)
          return L(e, a.C, o, r, i, l, s)
        }
        let f = a.render(a.props, a.state, a.context)
        return L(f, a.C, o, r, i, l, s)
      }
      a = t
      let h = String(n.type)
      if (!t || t.nodeName.toLowerCase() !== h.toLowerCase()) {
        a = (function (n, t) {
          let o = document.createElement(n)
          return (o.S = null), o
        })(h, i)
        let e = t
        if (e) for (; e.nextSibling;) D(o, e.nextSibling)
        D(o, a)
      }
      let d = a.childNodes
      let p = n.props.children
      let v = {}
      for (let k in n.props)
        'children' === k ||
          'key' === k ||
          '__self' === k ||
          '__source' === k ||
          'ref' === k ||
          (v[k] = n.props[k])
      if (v.dangerouslySetInnerHTML) a.innerHTML = v.dangerouslySetInnerHTML.__html
      else if (p) {
        let m = C(d, p)
        for (let g = 0; g < m.length; g++) {
          let b = m[g]
          if (b) {
            let y = d[g]
            let w = L(b, y, a, r, i, l, s)
            if (w && w !== a && w !== y) {
              if (y) {
                if (w === y.nextSibling) y.remove()
                else if (w.parentNode === a) D(y, w)
                else D(y, null)
              } else D(a, w)
            }
          }
        }
      }
      ;(function (n, t, o) {
        let r
        for (r in o) (r in t && t[r] == o[r]) || N(n, r, o[r], t[r], !1)
        for (r in t) (r in o) || N(n, r, null, t[r], !1)
      })(a, v, t ? t.S || {} : T),
        (a.S = v)
      D(n.ref, a)
      return a
    }
    function N(n, t, o, r, i) {
      if ('style' === t) {
        if ('string' == typeof o) n.style.cssText = o
        else {
          if ('string' == typeof r) n.style.cssText = ''
          for (let e in r) (o && e in o) || (n.style[e] = '')
          for (let e in o) n.style[e] = o[e]
        }
      } else if ('dangerouslySetInnerHTML' !== t) {
        if ('o' == t[0] && 'n' == t[1]) {
          let r = t !== (t = t.replace(/Capture$/, '')),
            i = t.toLowerCase().substring(2)
          t = (t.toLowerCase() in n ? t : t.toLowerCase()).substring(2)
          let l = n.S || (n.S = {})
          l[t] && n.removeEventListener(t, M, r),
            o && n.addEventListener(t, M, r),
            (l[t] = o)
        } else if ('ref' !== t && 'key' !== t) {
          if ('class' === t) n.className = o || ''
          else if ('checked' === t || 'disabled' === t || 'selected' === t) n[t] = !!o
          else if ('function' == typeof o) {
          } else if (null == o || !1 === o) n.removeAttribute(t)
          else n.setAttribute(t, o)
        }
      }
    }
    function M(n) {
      return this.S[n.type](n)
    }
    function O(n, t) {
      let o
      function r() {
        let i = n.S
        if (i && (o = i.base)) {
          let l = i.props,
            s = i.state,
            u = i.context
          if (!i.S || i.S(l, s, u)) {
            let c = L(i.render(l, s, u), o, t)
            i.C = c
          }
        }
      }
      return r()
    }
    function P(n, t) {
      ;(this.props = n), (this.context = t)
    }
    let R = [],
        U = []
    function j(n, t) {
      let o = R[I++]
      return o || (o = [t ? t(n) : n, (t, o) => {
        let r = o(t)
        o[0] = r
        O(this)
      }]), o
    }
    return (
      (P.prototype.setState = function (n, t) {
        let o = this.state
        o || (o = this.state = {}),
          'function' == typeof n && (n = n(o, this.props)),
          S(o, n),
          t && t()
        O(this)
      }),
      (P.prototype.forceUpdate = function (n) {
        n && n(), O(this)
      }),
      (V.Component = P),
      (V.render = function (n, t, o) {
        let r,
          i = t.S
        i ? (r = i.C) : (t.S = i = { C: null }),
          (n = V.h(P, { S: i, base: t, children: n })),
          L(n, r, t, {}, !1, o)
      }),
      (V.useState = function (n) {
        return j(n)
      }),
      (V.useCallback = function (n, t) {
        let o = j(n)
        return (
          (function (n, t) {
            let o = R[I - 1]
            if (o && o.length > 2) {
              let r = o[2]
              for (let i = 0; i < t.length; i++) if (t[i] !== r[i]) return (o[2] = t), n
            }
          })(n, t) || o[0]
        )
      }),
      (V.useMemo = function(n, t) {
          let o = j(n);
          return (
            (function (n, t) {
                let o = R[I-1];
                if (o && o.length > 2) {
                    let r = o[2];
                    for (let i=0; i<t.length; i++) {
                        if (t[i] !== r[i]) {
                            o[2] = t;
                            return n;
                        }
                    }
                }
            })(n, t) || o[0]
          )
      }),
      V
    )
  })()

  // --- Widget Logic ---

  const ChatIcon = () => h(
    'svg', { viewBox: '0 0 24 24', width: '32', height: '32', fill: 'white' },
    h('path', { d: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z' })
  );

  const CloseIcon = () => h(
    'svg', { viewBox: '0 0 24 24', width: '24', height: '24', fill: 'white' },
    h('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' })
  );

  const ChatGeniusWidget = ({ config }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    // --- Inline Styles ---
    const styles = {
        launcher: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: config.brandColor || '#F97316',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            zIndex: 9999,
            transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
            transform: isOpen ? 'scale(0.8)' : 'scale(1)',
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? 'none' : 'auto',
        },
        chatWindow: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '370px',
            height: '600px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            zIndex: 9999,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
            transformOrigin: 'bottom right',
            transform: isOpen ? 'scale(1)' : 'scale(0.95)',
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none',
        },
        header: {
            backgroundColor: config.brandColor || '#F97316',
            color: 'white',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerTitle: {
            fontWeight: 'bold',
            fontSize: '18px',
        },
        closeButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
        },
        messageArea: {
            flexGrow: 1,
            padding: '20px',
            overflowY: 'auto',
        },
        welcomeMessage: {
            backgroundColor: '#f1f1f1',
            padding: '12px',
            borderRadius: '10px 10px 10px 0',
            maxWidth: '80%',
            fontSize: '14px',
            lineHeight: '1.5',
        },
        footer: {
            padding: '16px',
            borderTop: '1px solid #eeeeee',
        },
        input: {
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #dddddd',
            fontSize: '14px',
            boxSizing: 'border-box',
        },
    };

    return h('div', null,
      // Launcher Button
      h('button', { style: styles.launcher, onClick: toggleOpen, 'aria-label': 'Open Chat' },
        h(ChatIcon)
      ),
      // Chat Window
      h('div', { style: styles.chatWindow },
        // Header
        h('div', { style: styles.header },
          h('p', { style: styles.headerTitle }, 'ChatGenius'),
          h('button', { style: styles.closeButton, onClick: toggleOpen, 'aria-label': 'Close Chat' },
            h(CloseIcon)
          )
        ),
        // Message Area
        h('div', { style: styles.messageArea },
          h('div', { style: styles.welcomeMessage }, config.welcomeMessage || 'Hello! How can we help?')
        ),
        // Footer
        h('div', { style: styles.footer },
          h('input', { style: styles.input, type: 'text', placeholder: 'Type your message...' })
        )
      )
    );
  };

  // --- Main Initialization Logic ---
  const init = (config) => {
    // 1. Create a root div for the widget
    const widgetRoot = document.createElement('div');
    widgetRoot.id = 'chatgenius-widget-root';
    document.body.appendChild(widgetRoot);

    // 2. Render the Preact component into the root div
    render(h(ChatGeniusWidget, { config }), widgetRoot);
  };

  // Expose the init function to the global scope
  window.ChatGenius = { init };

})();

    