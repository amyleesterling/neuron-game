// ── Custom SVG animal icons (themed cyan/teal on dark bg) ──
var HM = window.HM || {};

HM.ANIMAL_SVGS = {
  sponge: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="13" rx="7" ry="9" fill="#3a6a6a" opacity="0.6"/><ellipse cx="12" cy="13" rx="7" ry="9" stroke="#5fb8b8" stroke-width="1.2" fill="none"/><circle cx="9" cy="10" r="1.2" fill="#0a1a1a"/><circle cx="14" cy="9" r="1" fill="#0a1a1a"/><circle cx="11" cy="15" r="1.3" fill="#0a1a1a"/><circle cx="15" cy="14" r="0.9" fill="#0a1a1a"/><circle cx="8" cy="14" r="0.8" fill="#0a1a1a"/></svg>';
  },
  tardigrade: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="5" ry="4" fill="#3a6a6a" opacity="0.5"/><ellipse cx="12" cy="12" rx="5" ry="4" stroke="#5fb8b8" stroke-width="1.2" fill="none"/><line x1="7" y1="10" x2="4" y2="7" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><line x1="7" y1="14" x2="4" y2="17" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><line x1="9" y1="9" x2="7" y2="5" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><line x1="9" y1="15" x2="7" y2="19" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><line x1="15" y1="9" x2="17" y2="5" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><line x1="15" y1="15" x2="17" y2="19" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><line x1="17" y1="10" x2="20" y2="7" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><line x1="17" y1="14" x2="20" y2="17" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><circle cx="10" cy="11" r="0.7" fill="#a0e0e0"/><circle cx="14" cy="11" r="0.7" fill="#a0e0e0"/></svg>';
  },
  seasquirt: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M10 22 C10 22 8 14 8 10 C8 5 10 3 12 3 C14 3 16 5 16 10 C16 14 14 22 14 22" stroke="#5fb8b8" stroke-width="1.2" fill="#3a6a6a" opacity="0.5"/><path d="M10 22 C10 22 8 14 8 10 C8 5 10 3 12 3 C14 3 16 5 16 10 C16 14 14 22 14 22" stroke="#5fb8b8" stroke-width="1.2" fill="none"/><ellipse cx="12" cy="4" rx="3" ry="1.5" stroke="#5fb8b8" stroke-width="0.8" fill="none"/><line x1="10" y1="3" x2="9" y2="1" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><line x1="14" y1="3" x2="15" y2="1" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/></svg>';
  },
  roundworm: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M4 16 C6 8, 10 6, 12 10 C14 14, 16 8, 20 6" stroke="#5fb8b8" stroke-width="1.8" stroke-linecap="round" fill="none"/><circle cx="20" cy="6" r="1.5" fill="#5fb8b8" opacity="0.6"/><circle cx="20" cy="6" r="1.5" stroke="#5fb8b8" stroke-width="0.8" fill="none"/></svg>';
  },
  hydra: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="16" rx="3" ry="4" fill="#3a6a6a" opacity="0.5"/><ellipse cx="12" cy="16" rx="3" ry="4" stroke="#5fb8b8" stroke-width="1" fill="none"/><path d="M12 12 C12 8 8 4 6 2" stroke="#5fb8b8" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M12 12 C11 7 14 3 16 1" stroke="#5fb8b8" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M10 13 C7 10 4 10 2 9" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round" fill="none"/><path d="M14 13 C17 10 20 10 22 9" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round" fill="none"/><path d="M11 13 C9 9 5 7 3 5" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round" fill="none"/><path d="M13 13 C15 9 19 7 21 5" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round" fill="none"/><path d="M12 12 L12 4" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round" fill="none"/><line x1="12" y1="20" x2="12" y2="23" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/></svg>';
  },
  jellyfish: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M5 12 C5 6 8 3 12 3 C16 3 19 6 19 12" stroke="#5fb8b8" stroke-width="1.2" fill="#3a6a6a" opacity="0.5"/><path d="M5 12 C5 6 8 3 12 3 C16 3 19 6 19 12" stroke="#5fb8b8" stroke-width="1.2" fill="none"/><path d="M5 12 C7 14 9 12 10 14 C11 16 13 12 14 14 C15 16 17 14 19 12" stroke="#5fb8b8" stroke-width="0.8" fill="none"/><path d="M8 14 C7 17 8 20 7 22" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round" fill="none"/><path d="M12 14 C12 17 11 19 12 22" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round" fill="none"/><path d="M16 14 C17 17 16 20 17 22" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round" fill="none"/><path d="M10 15 C9 18 10 21 9 23" stroke="#5fb8b8" stroke-width="0.6" stroke-linecap="round" fill="none" opacity="0.5"/><path d="M14 15 C15 18 14 21 15 23" stroke="#5fb8b8" stroke-width="0.6" stroke-linecap="round" fill="none" opacity="0.5"/></svg>';
  },
  seaslug: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="15" rx="8" ry="4" fill="#3a6a6a" opacity="0.5"/><ellipse cx="12" cy="15" rx="8" ry="4" stroke="#5fb8b8" stroke-width="1" fill="none"/><path d="M18 14 C20 13 21 11 20 10" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round" fill="none"/><line x1="19" y1="12" x2="21" y2="9" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><line x1="20" y1="13" x2="23" y2="11" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><path d="M8 13 C7 10 8 8 10 7" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round" fill="none" opacity="0.6"/><path d="M10 13 C10 10 12 8 14 7" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round" fill="none" opacity="0.6"/><path d="M12 13 C13 11 15 9 17 8" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round" fill="none" opacity="0.6"/></svg>';
  },
  pondsnail: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M14 20 C9 20 6 19 6 17.5 C6 16 8 15.5 10 15.5" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round" fill="none"/><path d="M10 15.5 C10 15.5 9 12 10 8 C11 4 13 2 14 2 C15 2 16 4 15.5 8 C15 12 14 15.5 14 15.5" fill="#3a6a6a" opacity="0.4"/><path d="M10 15.5 C10 15.5 9 12 10 8 C11 4 13 2 14 2 C15 2 16 4 15.5 8 C15 12 14 15.5 14 15.5" stroke="#5fb8b8" stroke-width="1.1" fill="none"/><path d="M12 5 C12 8 12.5 12 12 15" stroke="#5fb8b8" stroke-width="0.5" fill="none" opacity="0.4"/><line x1="7" y1="17" x2="4" y2="14" stroke="#5fb8b8" stroke-width="0.7" stroke-linecap="round"/><line x1="8" y1="16.5" x2="6" y2="13.5" stroke="#5fb8b8" stroke-width="0.7" stroke-linecap="round"/><circle cx="4" cy="14" r="0.5" fill="#a0e0e0"/><circle cx="6" cy="13.5" r="0.5" fill="#a0e0e0"/><path d="M4 21 C6 20.5 8 21 10 20.5" stroke="#5fb8b8" stroke-width="0.4" opacity="0.3" stroke-linecap="round"/><path d="M12 21.5 C14 21 16 21.5 18 21" stroke="#5fb8b8" stroke-width="0.4" opacity="0.3" stroke-linecap="round"/></svg>';
  },
  snail: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M4 18 C4 18 3 16 4 15 C5 14 8 14 11 14" stroke="#5fb8b8" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M4 18 L18 18" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><ellipse cx="14" cy="12" rx="6" ry="6" fill="#3a6a6a" opacity="0.4"/><ellipse cx="14" cy="12" rx="6" ry="6" stroke="#5fb8b8" stroke-width="1.2" fill="none"/><path d="M14 6 Q10 8 11 12 Q12 16 17 15" stroke="#5fb8b8" stroke-width="0.8" fill="none" opacity="0.5"/><path d="M15 8 Q13 10 14 13" stroke="#5fb8b8" stroke-width="0.6" fill="none" opacity="0.35"/><line x1="6" y1="15" x2="5" y2="10" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><line x1="8" y1="14.5" x2="7.5" y2="10" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><circle cx="5" cy="10" r="0.8" fill="#a0e0e0"/><circle cx="7.5" cy="10" r="0.8" fill="#a0e0e0"/></svg>';
  },
  gardensnail: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M3 19 C3 17 5 15 9 15" stroke="#5fb8b8" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M3 19 L20 19" stroke="#5fb8b8" stroke-width="1.2" stroke-linecap="round"/><circle cx="15" cy="11" r="7.5" fill="#3a6a6a" opacity="0.45"/><circle cx="15" cy="11" r="7.5" stroke="#5fb8b8" stroke-width="1.4" fill="none"/><path d="M15 3.5 Q9 6 10 11 Q11 16 18 15" stroke="#5fb8b8" stroke-width="1" fill="none" opacity="0.55"/><path d="M17 6 Q13 8 14 12" stroke="#5fb8b8" stroke-width="0.8" fill="none" opacity="0.4"/><path d="M15.5 8.5 Q14 10 14.5 12" stroke="#5fb8b8" stroke-width="0.6" fill="none" opacity="0.3"/><line x1="5" y1="16" x2="4" y2="12" stroke="#5fb8b8" stroke-width="1.1" stroke-linecap="round"/><line x1="7" y1="15.5" x2="6.5" y2="12" stroke="#5fb8b8" stroke-width="1.1" stroke-linecap="round"/><circle cx="4" cy="12" r="1" fill="#a0e0e0"/><circle cx="6.5" cy="12" r="1" fill="#a0e0e0"/><path d="M1 20 C3 19.5 5 20 7 19.5 C9 19 11 20 13 19.5" stroke="#5fb8b8" stroke-width="0.5" opacity="0.25" stroke-linecap="round"/></svg>';
  },
  zebrafish: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M3 12 C3 8 7 6 12 6 C17 6 20 8 22 12 C20 16 17 18 12 18 C7 18 3 16 3 12Z" fill="#3a6a6a" opacity="0.4"/><path d="M3 12 C3 8 7 6 12 6 C17 6 20 8 22 12 C20 16 17 18 12 18 C7 18 3 16 3 12Z" stroke="#5fb8b8" stroke-width="1.2" fill="none"/><path d="M22 12 L24 9 L24 15 Z" stroke="#5fb8b8" stroke-width="0.8" fill="#3a6a6a" opacity="0.5"/><path d="M22 12 L24 9 L24 15 Z" stroke="#5fb8b8" stroke-width="0.8" fill="none"/><line x1="8" y1="7" x2="10" y2="17" stroke="#5fb8b8" stroke-width="0.6" opacity="0.4"/><line x1="12" y1="6" x2="13" y2="18" stroke="#5fb8b8" stroke-width="0.6" opacity="0.4"/><line x1="16" y1="7" x2="17" y2="17" stroke="#5fb8b8" stroke-width="0.6" opacity="0.4"/><circle cx="5" cy="11" r="1" fill="#a0e0e0"/><path d="M12 6 L13 3 L15 5" stroke="#5fb8b8" stroke-width="0.7" fill="none" opacity="0.5"/></svg>';
  },
  spider: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="10" rx="3" ry="2.5" fill="#3a6a6a" opacity="0.5"/><ellipse cx="12" cy="10" rx="3" ry="2.5" stroke="#5fb8b8" stroke-width="1" fill="none"/><ellipse cx="12" cy="15" rx="4" ry="3.5" fill="#3a6a6a" opacity="0.5"/><ellipse cx="12" cy="15" rx="4" ry="3.5" stroke="#5fb8b8" stroke-width="1" fill="none"/><path d="M10 9 C7 7 4 4 2 2" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><path d="M14 9 C17 7 20 4 22 2" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><path d="M9 10 C6 9 3 8 1 7" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><path d="M15 10 C18 9 21 8 23 7" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><path d="M9 13 C6 14 3 16 1 18" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><path d="M15 13 C18 14 21 16 23 18" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><path d="M9 15 C7 17 4 20 2 22" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><path d="M15 15 C17 17 20 20 22 22" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><circle cx="11" cy="9" r="0.6" fill="#a0e0e0"/><circle cx="13" cy="9" r="0.6" fill="#a0e0e0"/></svg>';
  },
  fruitfly: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="8" rx="2.5" ry="2" fill="#3a6a6a" opacity="0.5"/><ellipse cx="12" cy="8" rx="2.5" ry="2" stroke="#5fb8b8" stroke-width="1" fill="none"/><ellipse cx="12" cy="14" rx="3.5" ry="5" fill="#3a6a6a" opacity="0.5"/><ellipse cx="12" cy="14" rx="3.5" ry="5" stroke="#5fb8b8" stroke-width="1" fill="none"/><ellipse cx="6" cy="9" rx="4" ry="6" stroke="#5fb8b8" stroke-width="0.8" fill="none" opacity="0.4" transform="rotate(-30 6 9)"/><ellipse cx="18" cy="9" rx="4" ry="6" stroke="#5fb8b8" stroke-width="0.8" fill="none" opacity="0.4" transform="rotate(30 18 9)"/><circle cx="11" cy="7" r="0.8" fill="#ff6b6b" opacity="0.8"/><circle cx="13" cy="7" r="0.8" fill="#ff6b6b" opacity="0.8"/><line x1="11" y1="6" x2="9" y2="3" stroke="#5fb8b8" stroke-width="0.7" stroke-linecap="round"/><line x1="13" y1="6" x2="15" y2="3" stroke="#5fb8b8" stroke-width="0.7" stroke-linecap="round"/><line x1="10" y1="12" x2="7" y2="14" stroke="#5fb8b8" stroke-width="0.6" stroke-linecap="round"/><line x1="14" y1="12" x2="17" y2="14" stroke="#5fb8b8" stroke-width="0.6" stroke-linecap="round"/><line x1="10" y1="15" x2="6" y2="17" stroke="#5fb8b8" stroke-width="0.6" stroke-linecap="round"/><line x1="14" y1="15" x2="18" y2="17" stroke="#5fb8b8" stroke-width="0.6" stroke-linecap="round"/></svg>';
  },
  eldritchgoldfish: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M4 12 C4 9 7 7 12 7 C16 7 19 9 21 12 C19 15 16 17 12 17 C7 17 4 15 4 12Z" fill="#3a6a6a" opacity="0.45"/><path d="M4 12 C4 9 7 7 12 7 C16 7 19 9 21 12 C19 15 16 17 12 17 C7 17 4 15 4 12Z" stroke="#5fb8b8" stroke-width="1.1" fill="none"/><path d="M21 12 L24 9.5 L24 14.5 Z" fill="#3a6a6a" opacity="0.45" stroke="#5fb8b8" stroke-width="0.9"/><circle cx="8" cy="11" r="1" fill="#a0e0e0"/><path d="M11 6 L10 3" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><path d="M14 6 L16 3.5" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><path d="M12 7 Q10 4 7 4" stroke="#5fb8b8" stroke-width="0.7" opacity="0.7" fill="none"/><path d="M14 17 Q16 20 19 20" stroke="#5fb8b8" stroke-width="0.7" opacity="0.7" fill="none"/></svg>';
  },
  dungeonroomba: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="7" fill="#3a6a6a" opacity="0.45"/><circle cx="12" cy="12" r="7" stroke="#5fb8b8" stroke-width="1.2" fill="none"/><circle cx="12" cy="12" r="2" stroke="#5fb8b8" stroke-width="0.8" fill="none" opacity="0.7"/><path d="M8 5 L6 2" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><path d="M16 5 L18 2" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><path d="M5 8 L2 6" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><path d="M19 8 L22 6" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><path d="M6 18 L3 21" stroke="#ff6b6b" stroke-width="1" stroke-linecap="round"/><path d="M18 18 L21 21" stroke="#ff6b6b" stroke-width="1" stroke-linecap="round"/></svg>';
  },
  gelatinouscube: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="1.5" fill="#3a6a6a" opacity="0.45"/><rect x="6" y="6" width="12" height="12" rx="1.5" stroke="#5fb8b8" stroke-width="1.2" fill="none"/><path d="M8 9 L16 9" stroke="#5fb8b8" stroke-width="0.7" opacity="0.5"/><path d="M8 12 L16 12" stroke="#5fb8b8" stroke-width="0.7" opacity="0.35"/><path d="M8 15 L16 15" stroke="#5fb8b8" stroke-width="0.7" opacity="0.5"/><circle cx="10" cy="11" r="0.8" fill="#a0e0e0"/><circle cx="14" cy="13" r="0.7" fill="#a0e0e0"/></svg>';
  },
  buzzlightyear: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M12 3 L16 8 L14 8 L14 15 L10 15 L10 8 L8 8 Z" fill="#3a6a6a" opacity="0.45" stroke="#5fb8b8" stroke-width="1" stroke-linejoin="round"/><path d="M8.5 15 L6.5 19" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><path d="M15.5 15 L17.5 19" stroke="#5fb8b8" stroke-width="1" stroke-linecap="round"/><path d="M10 10 L7 12" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><path d="M14 10 L17 12" stroke="#5fb8b8" stroke-width="0.9" stroke-linecap="round"/><circle cx="12" cy="6" r="1.2" fill="#a0e0e0"/><path d="M6.5 12 Q4 10 3 7" stroke="#5fb8b8" stroke-width="0.8" opacity="0.6" fill="none"/><path d="M17.5 12 Q20 10 21 7" stroke="#5fb8b8" stroke-width="0.8" opacity="0.6" fill="none"/></svg>';
  },
  mimicchest: function(s) {
    s = s || 24;
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none"><path d="M5 10 C5 7.5 7 6 12 6 C17 6 19 7.5 19 10 L19 16 C19 18 17.5 19 12 19 C6.5 19 5 18 5 16 Z" fill="#3a6a6a" opacity="0.45"/><path d="M5 10 C5 7.5 7 6 12 6 C17 6 19 7.5 19 10 L19 16 C19 18 17.5 19 12 19 C6.5 19 5 18 5 16 Z" stroke="#5fb8b8" stroke-width="1.1" fill="none"/><path d="M5 11.5 L19 11.5" stroke="#5fb8b8" stroke-width="0.8"/><circle cx="10" cy="10" r="0.8" fill="#a0e0e0"/><circle cx="14" cy="10" r="0.8" fill="#a0e0e0"/><path d="M9 14 Q12 17 15 14" stroke="#ff6b6b" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M9 15 L7 18" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/><path d="M15 15 L17 18" stroke="#5fb8b8" stroke-width="0.8" stroke-linecap="round"/></svg>';
  }
};

HM.hashIconSeed = function(seed) {
  var hash = 0;
  for (var i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

HM.autoIconLabel = function(seed) {
  var parts = seed.replace(/^auto:/, '').split('-');
  var letters = '';
  for (var i = 0; i < parts.length && letters.length < 2; i++) {
    if (parts[i]) letters += parts[i].charAt(0).toUpperCase();
  }
  if (!letters && seed) letters = seed.slice(0, 2).toUpperCase();
  return letters || 'HM';
};

HM.autoBadgeSVG = function(seed, size) {
  size = size || 24;
  var palettes = [
    ['#5fb8b8', '#2f6f73', '#a0e0e0'],
    ['#76d6ff', '#1f4f7a', '#d7f8ff'],
    ['#ff9e66', '#6a3d24', '#ffe0c9'],
    ['#e98cff', '#5e2d72', '#f5d7ff'],
    ['#a8ff8a', '#345f2b', '#e7ffd9'],
    ['#ffe066', '#6a5615', '#fff7c2'],
    ['#ff8da1', '#6a2740', '#ffd6df']
  ];
  var hash = HM.hashIconSeed(seed);
  var palette = palettes[hash % palettes.length];
  var label = HM.autoIconLabel(seed);
  var shapeType = hash % 4;
  var accentType = hash % 5;
  var shape = '';
  if (shapeType === 0) {
    shape = '<circle cx="12" cy="12" r="8.2" fill="' + palette[1] + '" opacity="0.96"/><circle cx="12" cy="12" r="8.2" stroke="' + palette[0] + '" stroke-width="1.2" fill="none"/>';
  } else if (shapeType === 1) {
    shape = '<rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="' + palette[1] + '" opacity="0.96"/><rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="' + palette[0] + '" stroke-width="1.2" fill="none"/>';
  } else if (shapeType === 2) {
    shape = '<path d="M12 3.6 L19.2 7.8 L19.2 16.2 L12 20.4 L4.8 16.2 L4.8 7.8 Z" fill="' + palette[1] + '" opacity="0.96"/><path d="M12 3.6 L19.2 7.8 L19.2 16.2 L12 20.4 L4.8 16.2 L4.8 7.8 Z" stroke="' + palette[0] + '" stroke-width="1.2" fill="none"/>';
  } else {
    shape = '<path d="M12 3.5 L18.6 6.3 L18.6 12.2 C18.6 16.1 15.9 19.2 12 20.5 C8.1 19.2 5.4 16.1 5.4 12.2 L5.4 6.3 Z" fill="' + palette[1] + '" opacity="0.96"/><path d="M12 3.5 L18.6 6.3 L18.6 12.2 C18.6 16.1 15.9 19.2 12 20.5 C8.1 19.2 5.4 16.1 5.4 12.2 L5.4 6.3 Z" stroke="' + palette[0] + '" stroke-width="1.2" fill="none"/>';
  }

  var accent = '';
  if (accentType === 0) {
    accent = '<circle cx="7.2" cy="7.6" r="1.1" fill="' + palette[2] + '" opacity="0.95"/><circle cx="17.4" cy="16.8" r="0.9" fill="' + palette[2] + '" opacity="0.9"/>';
  } else if (accentType === 1) {
    accent = '<path d="M7 17 Q12 6 17 17" stroke="' + palette[0] + '" stroke-width="1.1" opacity="0.7" fill="none"/>';
  } else if (accentType === 2) {
    accent = '<path d="M6.8 9.2 L9 9.6 L10 7.6 L11 9.6 L13.2 9.2 L11.7 10.8 L12.3 13 L10 11.8 L7.7 13 L8.3 10.8 Z" fill="' + palette[2] + '" opacity="0.85"/>';
  } else if (accentType === 3) {
    accent = '<path d="M6 15.7 C8.1 13.6 15.9 13.6 18 15.7" stroke="' + palette[0] + '" stroke-width="1" opacity="0.7" fill="none"/>';
  } else {
    accent = '<circle cx="12" cy="12" r="6.2" stroke="' + palette[0] + '" stroke-width="0.9" opacity="0.35" fill="none"/>';
  }

  var fontSize = label.length > 1 ? 7.2 : 9.5;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none">' +
    '<defs><radialGradient id="g' + hash + '" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 9) rotate(90) scale(12)"><stop stop-color="' + palette[2] + '" stop-opacity="0.45"/><stop offset="1" stop-color="' + palette[1] + '" stop-opacity="0"/></radialGradient></defs>' +
    '<circle cx="12" cy="12" r="11" fill="url(#g' + hash + ')"/>' +
    shape + accent +
    '<text x="12" y="14.4" text-anchor="middle" font-family="Courier New, monospace" font-size="' + fontSize + '" font-weight="700" fill="' + palette[2] + '">' + label + '</text>' +
    '</svg>';
};

HM.animalSVG = function(id, size) {
  if (HM.ANIMAL_SVGS[id]) return HM.ANIMAL_SVGS[id](size);
  return HM.autoBadgeSVG(id || 'hm', size);
};

window.HM = HM;
