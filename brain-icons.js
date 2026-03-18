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

HM.iconWords = function(seed) {
  return (seed || '').replace(/^auto:/, '').split('-').filter(Boolean);
};

HM.iconHas = function(words, values) {
  for (var i = 0; i < values.length; i++) {
    if (words.indexOf(values[i]) !== -1) return true;
  }
  return false;
};

HM.autoPalette = function(words, hash) {
  var palettes = {
    aqua: { line: '#5fb8b8', fill: '#214e5a', light: '#aaf3ef', accent: '#ffe566', pop: '#ff8da1' },
    ember: { line: '#ff9a5f', fill: '#5b241a', light: '#ffd3b0', accent: '#ffe566', pop: '#ff6b6b' },
    moss: { line: '#9ce56d', fill: '#284d1f', light: '#e9ffd5', accent: '#76d6ff', pop: '#ffe066' },
    spectral: { line: '#d98cff', fill: '#40215d', light: '#f8dcff', accent: '#76d6ff', pop: '#ff8da1' },
    steel: { line: '#89bfff', fill: '#223654', light: '#e2f0ff', accent: '#ffe566', pop: '#76d6ff' },
    royal: { line: '#ffe066', fill: '#5f4616', light: '#fff7c7', accent: '#ff8da1', pop: '#76d6ff' }
  };
  if (HM.iconHas(words, ['void', 'shadow', 'ghost', 'phantom', 'haunted', 'lich', 'warlock', 'necromancer', 'demogorgon', 'mewtwo', 'gengar', 'dream'])) return palettes.spectral;
  if (HM.iconHas(words, ['dragon', 'wyrm', 'wyvern', 'drake', 'lava', 'plasma', 'phoenix', 'charmander', 'candy'])) return palettes.ember;
  if (HM.iconHas(words, ['goblin', 'orc', 'kobold', 'gremlin', 'ogre', 'troll', 'frog', 'toad', 'bulbasaur', 'slime', 'blob', 'fungal', 'moss', 'bug', 'beetle', 'moth'])) return palettes.moss;
  if (HM.iconHas(words, ['robo', 'mecha', 'cyber', 'gear', 'glitch', 'chrome', 'nano', 'space', 'astro', 'astral', 'cosmic', 'star', 'moon', 'celestial', 'storm', 'laser'])) return palettes.steel;
  if (HM.iconHas(words, ['king', 'prime', 'emperor', 'elder', 'titan', 'colossus', 'overlord'])) return palettes.royal;
  return [palettes.aqua, palettes.moss, palettes.steel, palettes.spectral, palettes.ember][hash % 5];
};

HM.autoCreatureTraits = function(seed) {
  var words = HM.iconWords(seed);
  var slug = words.join('-');
  var traits = {
    words: words,
    slug: slug,
    body: 'beast',
    ears: 'round',
    eyes: 'dot',
    mouth: 'smile',
    horns: false,
    wings: false,
    drips: false,
    bubbles: false,
    teeth: false,
    cheeks: false,
    hat: false,
    shell: false,
    bulb: false,
    crest: false,
    tufts: false,
    collar: false,
    lightningTail: false,
    flameTail: false,
    crown: false,
    stitches: false,
    sleepy: false,
    skull: false,
    visor: false,
    buttonEyes: false,
    dome: false,
    spikes: false,
    leaf: false,
    beard: false,
    fishFin: false,
    swirl: false,
    accentMode: 'none'
  };

  if (slug === 'pikachu') {
    traits.body = 'beast'; traits.ears = 'long'; traits.cheeks = true; traits.lightningTail = true; traits.mouth = 'grin';
  } else if (slug === 'jigglypuff') {
    traits.body = 'beast'; traits.ears = 'cat'; traits.swirl = true; traits.mouth = 'cute';
  } else if (slug === 'psyduck') {
    traits.body = 'bird'; traits.tufts = true; traits.mouth = 'beak';
  } else if (slug === 'bulbasaur') {
    traits.body = 'frog'; traits.bulb = true; traits.leaf = true;
  } else if (slug === 'charmander') {
    traits.body = 'dragon'; traits.flameTail = true; traits.mouth = 'grin';
  } else if (slug === 'squirtle') {
    traits.body = 'beast'; traits.shell = true; traits.swirl = true; traits.mouth = 'cute';
  } else if (slug === 'eevee') {
    traits.body = 'beast'; traits.ears = 'fox'; traits.collar = true;
  } else if (slug === 'gengar') {
    traits.body = 'ghost'; traits.spikes = true; traits.mouth = 'grin'; traits.eyes = 'evil';
  } else if (slug === 'snorlax') {
    traits.body = 'beast'; traits.sleepy = true; traits.mouth = 'smile'; traits.shell = true;
  } else if (slug === 'cubone') {
    traits.body = 'beast'; traits.skull = true; traits.ears = 'none';
  } else if (slug === 'lapras') {
    traits.body = 'fish'; traits.shell = true; traits.crest = true; traits.bubbles = true;
  } else if (slug === 'mewtwo' || slug === 'mewtwo-prime') {
    traits.body = 'wizard'; traits.visor = true; traits.lightningTail = true; traits.accentMode = 'psychic';
  } else if (slug === 'magikarp') {
    traits.body = 'fish'; traits.crest = true; traits.bubbles = true;
  } else if (slug === 'dragonite') {
    traits.body = 'dragon'; traits.wings = true; traits.mouth = 'cute';
  } else if (HM.iconHas(words, ['mimic'])) {
    traits.body = 'mimic'; traits.teeth = true;
  } else if (HM.iconHas(words, ['roomba'])) {
    traits.body = 'roomba'; traits.spikes = true;
  } else if (HM.iconHas(words, ['cube'])) {
    traits.body = 'cube'; traits.drips = true;
  } else if (HM.iconHas(words, ['slime', 'blob', 'jelly', 'gelatinous', 'wisp'])) {
    traits.body = 'blob'; traits.drips = true;
  } else if (HM.iconHas(words, ['wizard', 'warlock', 'lich', 'necromancer', 'overlord', 'oracle'])) {
    traits.body = 'wizard'; traits.hat = true; traits.beard = !HM.iconHas(words, ['lich', 'necromancer']); traits.skull = HM.iconHas(words, ['lich', 'necromancer']);
  } else if (HM.iconHas(words, ['robo', 'mecha', 'cyber', 'gear', 'glitch', 'chrome', 'nano', 'doom'])) {
    traits.body = 'robot'; traits.visor = true;
  } else if (HM.iconHas(words, ['dragon', 'wyrm', 'wyvern', 'drake', 'hydra', 'serpent', 'basilisk', 'chimera'])) {
    traits.body = 'dragon'; traits.horns = true; traits.wings = HM.iconHas(words, ['wyvern', 'chimera', 'phoenix']);
  } else if (HM.iconHas(words, ['goblin', 'orc', 'kobold', 'gnome', 'gremlin', 'ogre', 'troll', 'bandit', 'barbarian', 'pilot', 'accountant', 'intern', 'clerk', 'union'])) {
    traits.body = 'goblin'; traits.ears = 'point'; traits.teeth = true;
  } else if (HM.iconHas(words, ['ghost', 'phantom', 'haunted', 'cursed', 'demon', 'vampire', 'demogorgon'])) {
    traits.body = 'ghost'; traits.horns = HM.iconHas(words, ['demon', 'demogorgon']); traits.eyes = 'evil';
  } else if (HM.iconHas(words, ['fish', 'kraken', 'leviathan', 'newt', 'axolotl', 'otter', 'goldfish', 'crab', 'crawler'])) {
    traits.body = 'fish'; traits.fishFin = true; traits.bubbles = true;
  } else if (HM.iconHas(words, ['bug', 'beetle', 'moth', 'fly'])) {
    traits.body = 'bug'; traits.wings = true;
  } else if (HM.iconHas(words, ['frog', 'toad'])) {
    traits.body = 'frog';
  } else if (HM.iconHas(words, ['pigeon', 'phoenix', 'griffin'])) {
    traits.body = 'bird'; traits.wings = true; traits.crest = true;
  } else if (HM.iconHas(words, ['toy', 'plush', 'pocket', 'pixel', 'doodle', 'waffle', 'knight'])) {
    traits.body = 'toy'; traits.buttonEyes = HM.iconHas(words, ['plush', 'toy']); traits.stitches = HM.iconHas(words, ['plush', 'doodle']);
  }

  if (HM.iconHas(words, ['space', 'astro', 'astral', 'cosmic', 'star', 'moon', 'void', 'celestial'])) traits.accentMode = 'space';
  else if (HM.iconHas(words, ['dream', 'shadow', 'phantom'])) traits.accentMode = 'dream';
  else if (HM.iconHas(words, ['lava', 'plasma', 'laser', 'neon', 'storm'])) traits.accentMode = 'energy';
  else if (HM.iconHas(words, ['bubble', 'fish', 'newt', 'axolotl', 'kraken', 'leviathan', 'lapras', 'magikarp'])) traits.accentMode = 'bubbles';
  else if (HM.iconHas(words, ['candy', 'snack', 'plush', 'toy', 'waffle'])) traits.accentMode = 'sparkles';

  if (HM.iconHas(words, ['king', 'prime', 'emperor', 'elder', 'overlord'])) traits.crown = true;
  if (HM.iconHas(words, ['space', 'astro', 'astronaut', 'pilot'])) traits.dome = true;
  if (HM.iconHas(words, ['dragon', 'kaiju', 'chimera', 'beast', 'yeti', 'gargoyle', 'titan', 'colossus', 'kraken', 'hydra'])) traits.spikes = true;
  if (HM.iconHas(words, ['frog', 'toad'])) traits.eyes = 'wide';
  if (HM.iconHas(words, ['slime', 'blob', 'gelatinous', 'jelly'])) traits.eyes = 'cute';
  if (HM.iconHas(words, ['plush', 'toy'])) traits.mouth = 'cute';
  if (HM.iconHas(words, ['sleepy', 'snorlax'])) traits.sleepy = true;

  return traits;
};

HM.autoAccentSVG = function(traits, palette) {
  var svg = '';
  if (traits.accentMode === 'space') {
    svg += '<circle cx="5.5" cy="6.2" r="1" fill="' + palette.accent + '" opacity="0.85"/><circle cx="18.3" cy="5.4" r="0.75" fill="' + palette.light + '" opacity="0.9"/><path d="M18.8 18.4 Q20.8 16.8 21.3 14.2" stroke="' + palette.line + '" stroke-width="0.9" opacity="0.7" fill="none"/>';
  } else if (traits.accentMode === 'dream' || traits.accentMode === 'psychic') {
    svg += '<path d="M4.8 18.2 C6.8 16.2 8.2 16.5 9.6 18.2" stroke="' + palette.line + '" stroke-width="0.8" opacity="0.65" fill="none"/><circle cx="18.7" cy="7" r="1.05" fill="' + palette.pop + '" opacity="0.82"/>';
  } else if (traits.accentMode === 'energy') {
    svg += '<path d="M18.2 4.8 L16.8 7.6 L18.9 7.6 L16.5 11.2" stroke="' + palette.accent + '" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>';
  } else if (traits.accentMode === 'bubbles') {
    svg += '<circle cx="18.4" cy="6.5" r="1.1" stroke="' + palette.light + '" stroke-width="0.8" fill="none" opacity="0.75"/><circle cx="20.6" cy="9.2" r="0.65" stroke="' + palette.light + '" stroke-width="0.7" fill="none" opacity="0.6"/>';
  } else if (traits.accentMode === 'sparkles') {
    svg += '<path d="M5.5 6.8 L6.3 8.5 L8 9.3 L6.3 10.1 L5.5 11.8 L4.7 10.1 L3 9.3 L4.7 8.5 Z" fill="' + palette.accent + '" opacity="0.85"/>';
  }
  if (traits.crown) {
    svg += '<path d="M8.2 5.7 L10 3.9 L12 5.5 L14 3.9 L15.8 5.7 L15.4 7.2 L8.6 7.2 Z" fill="' + palette.accent + '" opacity="0.92" stroke="' + palette.line + '" stroke-width="0.7" stroke-linejoin="round"/>';
  }
  return svg;
};

HM.autoCreatureSVG = function(seed, size) {
  size = size || 24;
  var traits = HM.autoCreatureTraits(seed || 'hm');
  var hash = HM.hashIconSeed(seed || 'hm');
  var palette = HM.autoPalette(traits.words, hash);
  var body = '';
  var face = '';
  var extras = '';

  switch (traits.body) {
    case 'cube':
      body = '<rect x="6.2" y="6.2" width="11.6" height="11.6" rx="2" fill="' + palette.fill + '" opacity="0.96"/><rect x="6.2" y="6.2" width="11.6" height="11.6" rx="2" stroke="' + palette.line + '" stroke-width="1.1" fill="none"/><path d="M8.1 16.8 C8.1 18.5 9.3 19.4 10.5 19.8" stroke="' + palette.line + '" stroke-width="0.9" stroke-linecap="round" opacity="0.8" fill="none"/><path d="M13.6 16.8 C13.8 18.3 15 19.1 16.2 19.7" stroke="' + palette.line + '" stroke-width="0.9" stroke-linecap="round" opacity="0.75" fill="none"/>';
      break;
    case 'blob':
      body = '<path d="M6 14.7 C5.6 10 8 6.3 12 6.1 C16.2 5.9 18.5 9.6 18.1 14.2 C17.8 17.5 15.3 19 12 19 C8.5 19 6.2 17.9 6 14.7 Z" fill="' + palette.fill + '" opacity="0.96"/><path d="M6 14.7 C5.6 10 8 6.3 12 6.1 C16.2 5.9 18.5 9.6 18.1 14.2 C17.8 17.5 15.3 19 12 19 C8.5 19 6.2 17.9 6 14.7 Z" stroke="' + palette.line + '" stroke-width="1.1" fill="none"/>';
      break;
    case 'fish':
      body = '<path d="M5 12 C5.2 8.8 8.2 6.7 11.9 6.7 C15.8 6.7 18.6 8.8 20 12 C18.6 15.2 15.8 17.3 11.9 17.3 C8.2 17.3 5.2 15.2 5 12 Z" fill="' + palette.fill + '" opacity="0.96"/><path d="M5 12 C5.2 8.8 8.2 6.7 11.9 6.7 C15.8 6.7 18.6 8.8 20 12 C18.6 15.2 15.8 17.3 11.9 17.3 C8.2 17.3 5.2 15.2 5 12 Z" stroke="' + palette.line + '" stroke-width="1.05" fill="none"/><path d="M19 12 L22 9.5 L22 14.5 Z" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="0.95" stroke-linejoin="round"/>';
      break;
    case 'ghost':
      body = '<path d="M7 18 L7 10.9 C7 7.7 9.1 5.8 12 5.8 C14.9 5.8 17 7.7 17 10.9 L17 18 L15.2 16.8 L13.2 18 L11.1 16.8 L9 18 Z" fill="' + palette.fill + '" opacity="0.96"/><path d="M7 18 L7 10.9 C7 7.7 9.1 5.8 12 5.8 C14.9 5.8 17 7.7 17 10.9 L17 18 L15.2 16.8 L13.2 18 L11.1 16.8 L9 18 Z" stroke="' + palette.line + '" stroke-width="1.05" fill="none"/>';
      break;
    case 'robot':
      body = '<rect x="6.3" y="6.4" width="11.4" height="9.8" rx="2.6" fill="' + palette.fill + '" opacity="0.96"/><rect x="6.3" y="6.4" width="11.4" height="9.8" rx="2.6" stroke="' + palette.line + '" stroke-width="1.05" fill="none"/><rect x="8.6" y="16.4" width="6.8" height="2.4" rx="1.1" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="0.95"/><path d="M12 6.4 L12 4.3" stroke="' + palette.line + '" stroke-width="0.9" stroke-linecap="round"/><circle cx="12" cy="3.5" r="0.85" fill="' + palette.accent + '"/>';
      break;
    case 'wizard':
      body = '<circle cx="12" cy="9.9" r="3.1" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05"/><path d="M8.1 18.6 L9.9 12.9 L14.1 12.9 L15.9 18.6 Z" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05" stroke-linejoin="round"/>';
      break;
    case 'bug':
      body = '<ellipse cx="12" cy="9" rx="2.8" ry="2.4" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="0.95"/><ellipse cx="12" cy="13" rx="3.4" ry="3.1" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05"/><ellipse cx="12" cy="17.1" rx="2.7" ry="2.2" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="0.95"/>';
      break;
    case 'frog':
      body = '<ellipse cx="12" cy="14.2" rx="6.3" ry="4.8" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05"/><circle cx="9" cy="9" r="2" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="0.95"/><circle cx="15" cy="9" r="2" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="0.95"/>';
      break;
    case 'bird':
      body = '<path d="M7.2 14.8 C7.2 9.6 9.4 6.5 12.4 6.5 C15.2 6.5 17.1 9 17.1 13.6 C17.1 17 15.1 18.8 12.1 18.8 C9.1 18.8 7.2 17.2 7.2 14.8 Z" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05"/><path d="M16.8 11.8 L20 12.7 L16.9 14.1 Z" fill="' + palette.accent + '" opacity="0.95" stroke="' + palette.line + '" stroke-width="0.8" stroke-linejoin="round"/>';
      break;
    case 'toy':
      body = '<circle cx="12" cy="11.2" r="4.2" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05"/><rect x="8.2" y="14.5" width="7.6" height="4.3" rx="2" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05"/>';
      break;
    case 'mimic':
      body = '<path d="M5.5 10 C5.5 8 7.2 6.6 12 6.6 C16.8 6.6 18.5 8 18.5 10.1 L18.5 16.2 C18.5 18 17.1 19 12 19 C6.9 19 5.5 18 5.5 16.2 Z" fill="' + palette.fill + '" opacity="0.96"/><path d="M5.5 10 C5.5 8 7.2 6.6 12 6.6 C16.8 6.6 18.5 8 18.5 10.1 L18.5 16.2 C18.5 18 17.1 19 12 19 C6.9 19 5.5 18 5.5 16.2 Z" stroke="' + palette.line + '" stroke-width="1.05" fill="none"/><path d="M5.8 11.6 L18.2 11.6" stroke="' + palette.line + '" stroke-width="0.85"/>';
      break;
    case 'roomba':
      body = '<circle cx="12" cy="12.2" r="6.7" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05"/><circle cx="12" cy="12.2" r="2.1" stroke="' + palette.line + '" stroke-width="0.85" fill="none" opacity="0.75"/>';
      break;
    case 'dragon':
      body = '<path d="M6.5 15.4 C6.5 9.5 9.1 6.1 12.3 6.1 C15.8 6.1 18 9.1 17.6 14.2 C17.3 17.6 15.3 19 12 19 C8.6 19 6.5 18 6.5 15.4 Z" fill="' + palette.fill + '" opacity="0.96"/><path d="M6.5 15.4 C6.5 9.5 9.1 6.1 12.3 6.1 C15.8 6.1 18 9.1 17.6 14.2 C17.3 17.6 15.3 19 12 19 C8.6 19 6.5 18 6.5 15.4 Z" stroke="' + palette.line + '" stroke-width="1.05" fill="none"/>';
      break;
    case 'goblin':
      body = '<circle cx="12" cy="12.3" r="5.8" fill="' + palette.fill + '" opacity="0.96" stroke="' + palette.line + '" stroke-width="1.05"/>';
      break;
    default:
      body = '<path d="M6.6 15.3 C6.6 9.5 8.8 6.4 12 6.4 C15.3 6.4 17.4 9.2 17.4 15 C17.4 17.8 15.2 19 12 19 C8.8 19 6.6 17.9 6.6 15.3 Z" fill="' + palette.fill + '" opacity="0.96"/><path d="M6.6 15.3 C6.6 9.5 8.8 6.4 12 6.4 C15.3 6.4 17.4 9.2 17.4 15 C17.4 17.8 15.2 19 12 19 C8.8 19 6.6 17.9 6.6 15.3 Z" stroke="' + palette.line + '" stroke-width="1.05" fill="none"/>';
      break;
  }

  if (traits.ears === 'long') extras += '<path d="M8.7 7.2 L7 2.8 L9.9 5.5" stroke="' + palette.line + '" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.3 7.2 L17 2.8 L14.1 5.5" stroke="' + palette.line + '" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>';
  else if (traits.ears === 'point' || traits.ears === 'cat' || traits.ears === 'fox') extras += '<path d="M8.7 7.8 L7 4.7 L10 6.3" stroke="' + palette.line + '" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.3 7.8 L17 4.7 L14 6.3" stroke="' + palette.line + '" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>';
  if (traits.horns) extras += '<path d="M9.2 7.3 L8.1 4.8 L10.1 6" stroke="' + palette.accent + '" stroke-width="0.95" stroke-linecap="round"/><path d="M14.8 7.3 L15.9 4.8 L13.9 6" stroke="' + palette.accent + '" stroke-width="0.95" stroke-linecap="round"/>';
  if (traits.wings) extras += '<path d="M7.6 12.7 Q4.4 10.4 5.1 7.8" stroke="' + palette.line + '" stroke-width="0.9" fill="none" stroke-linecap="round"/><path d="M16.4 12.7 Q19.6 10.4 18.9 7.8" stroke="' + palette.line + '" stroke-width="0.9" fill="none" stroke-linecap="round"/>';
  if (traits.drips) extras += '<path d="M8.3 17.6 C8.3 19 9.2 19.6 10 20" stroke="' + palette.line + '" stroke-width="0.85" stroke-linecap="round"/><path d="M13.8 17.5 C13.8 18.8 14.8 19.5 15.6 20" stroke="' + palette.line + '" stroke-width="0.85" stroke-linecap="round"/>';
  if (traits.bulb) extras += '<ellipse cx="12" cy="7.8" rx="2.7" ry="2.1" fill="' + palette.line + '" opacity="0.55"/>';
  if (traits.leaf) extras += '<path d="M10.2 6.7 L8.3 4.7" stroke="' + palette.line + '" stroke-width="0.85" stroke-linecap="round"/><path d="M13.8 6.7 L15.7 4.7" stroke="' + palette.line + '" stroke-width="0.85" stroke-linecap="round"/>';
  if (traits.shell) extras += '<path d="M9.3 12.8 Q12 9.4 14.7 12.8 Q12.7 15.4 9.9 14.6" stroke="' + palette.accent + '" stroke-width="0.8" fill="none" opacity="0.8"/>';
  if (traits.crest) extras += '<path d="M12 6.2 L13.1 4.3 L14.3 6.1" stroke="' + palette.accent + '" stroke-width="0.85" stroke-linecap="round" stroke-linejoin="round"/>';
  if (traits.tufts) extras += '<path d="M10.8 6.4 L10.1 4.1" stroke="' + palette.line + '" stroke-width="0.85" stroke-linecap="round"/><path d="M12 6.1 L12 3.6" stroke="' + palette.line + '" stroke-width="0.85" stroke-linecap="round"/><path d="M13.2 6.4 L13.9 4.1" stroke="' + palette.line + '" stroke-width="0.85" stroke-linecap="round"/>';
  if (traits.collar) extras += '<path d="M8.4 12.8 Q12 15.2 15.6 12.8" stroke="' + palette.light + '" stroke-width="1" fill="none" stroke-linecap="round"/>';
  if (traits.lightningTail) extras += '<path d="M16.4 16.2 L19.4 15.1 L17.6 17.1 L20.6 18.3" stroke="' + palette.accent + '" stroke-width="0.95" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  if (traits.flameTail) extras += '<path d="M16.2 16.8 Q18.4 16.1 19.2 18.5 Q18.2 19.7 16.8 19.1" fill="' + palette.pop + '" opacity="0.85" stroke="' + palette.accent + '" stroke-width="0.75"/>';
  if (traits.stitches) extras += '<path d="M8.4 15.4 L15.6 15.4" stroke="' + palette.line + '" stroke-width="0.65" opacity="0.5" stroke-dasharray="1.2 1.2"/>';
  if (traits.dome) extras += '<path d="M7.4 10.2 C7.4 7.2 9.5 5.6 12 5.6 C14.5 5.6 16.6 7.2 16.6 10.2" stroke="' + palette.light + '" stroke-width="0.75" opacity="0.55" fill="none"/>';
  if (traits.spikes) extras += '<path d="M9 6.8 L10 5.3 L11 6.8 L12 5.1 L13 6.8 L14 5.4 L15 6.8" stroke="' + palette.line + '" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" fill="none"/>';
  if (traits.buttonEyes) face += '<circle cx="10.3" cy="11.4" r="1.1" fill="' + palette.light + '"/><circle cx="13.7" cy="11.4" r="1.1" fill="' + palette.light + '"/><circle cx="10.3" cy="11.4" r="0.25" fill="' + palette.line + '"/><circle cx="13.7" cy="11.4" r="0.25" fill="' + palette.line + '"/>';
  else if (traits.visor) face += '<rect x="8.4" y="10.3" width="7.2" height="2.1" rx="1" fill="' + palette.light + '" opacity="0.85"/><rect x="8.4" y="10.3" width="7.2" height="2.1" rx="1" stroke="' + palette.line + '" stroke-width="0.55" fill="none"/>';
  else if (traits.skull) face += '<circle cx="10.2" cy="11.2" r="1.1" fill="#08131a" opacity="0.9"/><circle cx="13.8" cy="11.2" r="1.1" fill="#08131a" opacity="0.9"/><path d="M12 12.2 L11.3 13.5 L12.7 13.5 Z" fill="#08131a" opacity="0.85"/><path d="M9.7 15.2 L14.3 15.2" stroke="#08131a" stroke-width="0.9" stroke-linecap="round"/>';
  else if (traits.mouth === 'beak') face += '<circle cx="10.1" cy="10.6" r="0.65" fill="' + palette.light + '"/><circle cx="13.9" cy="10.6" r="0.65" fill="' + palette.light + '"/><path d="M10 12.6 L14 12.6 L12 14.4 Z" fill="' + palette.accent + '" stroke="' + palette.line + '" stroke-width="0.65" stroke-linejoin="round"/>';
  else if (traits.sleepy) face += '<path d="M9.2 10.8 L10.8 10.8" stroke="' + palette.light + '" stroke-width="0.9" stroke-linecap="round"/><path d="M13.2 10.8 L14.8 10.8" stroke="' + palette.light + '" stroke-width="0.9" stroke-linecap="round"/><path d="M9.5 14.2 Q12 15.5 14.5 14.2" stroke="' + palette.light + '" stroke-width="0.9" fill="none" stroke-linecap="round"/>';
  else if (traits.eyes === 'evil') face += '<path d="M9.1 10.7 L11 10.2" stroke="' + palette.light + '" stroke-width="0.95" stroke-linecap="round"/><path d="M13 10.2 L14.9 10.7" stroke="' + palette.light + '" stroke-width="0.95" stroke-linecap="round"/><path d="M9.2 14.4 Q12 13 14.8 14.4" stroke="' + palette.pop + '" stroke-width="0.95" fill="none" stroke-linecap="round"/>';
  else if (traits.eyes === 'wide') face += '<circle cx="9.8" cy="10.6" r="0.95" fill="' + palette.light + '"/><circle cx="14.2" cy="10.6" r="0.95" fill="' + palette.light + '"/><circle cx="9.8" cy="10.6" r="0.35" fill="#08131a"/><circle cx="14.2" cy="10.6" r="0.35" fill="#08131a"/><path d="M9.7 14.3 Q12 15.4 14.3 14.3" stroke="' + palette.light + '" stroke-width="0.85" fill="none" stroke-linecap="round"/>';
  else {
    face += '<circle cx="10.1" cy="10.8" r="0.8" fill="' + palette.light + '"/><circle cx="13.9" cy="10.8" r="0.8" fill="' + palette.light + '"/>';
    if (traits.mouth === 'grin') face += '<path d="M9.2 14.1 Q12 16 14.8 14.1" stroke="' + palette.pop + '" stroke-width="0.95" fill="none" stroke-linecap="round"/>';
    else if (traits.mouth === 'cute') face += '<path d="M10.1 14.3 Q12 15.4 13.9 14.3" stroke="' + palette.light + '" stroke-width="0.85" fill="none" stroke-linecap="round"/>';
    else face += '<path d="M9.6 14.3 Q12 15.6 14.4 14.3" stroke="' + palette.light + '" stroke-width="0.9" fill="none" stroke-linecap="round"/>';
  }
  if (traits.cheeks) face += '<circle cx="8.1" cy="13.3" r="1.05" fill="#ff6b6b" opacity="0.9"/><circle cx="15.9" cy="13.3" r="1.05" fill="#ff6b6b" opacity="0.9"/>';
  if (traits.teeth) face += '<path d="M10 15.2 L11 16.1 L12 15.2 L13 16.1 L14 15.2" stroke="' + palette.accent + '" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>';
  if (traits.swirl) extras += '<path d="M11.8 7.6 C12.8 6.5 14.2 6.8 14.2 8 C14.2 9 13.3 9.6 12.3 9.3" stroke="' + palette.accent + '" stroke-width="0.8" fill="none" stroke-linecap="round"/>';

  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none">' +
    '<circle cx="12" cy="12" r="11" fill="' + palette.fill + '" opacity="0.12"/>' +
    HM.autoAccentSVG(traits, palette) + body + extras + face +
    '</svg>';
};

HM.animalSVG = function(id, size) {
  if (HM.ANIMAL_SVGS[id]) return HM.ANIMAL_SVGS[id](size);
  return HM.autoCreatureSVG(id || 'hm', size);
};
window.HM = HM;
