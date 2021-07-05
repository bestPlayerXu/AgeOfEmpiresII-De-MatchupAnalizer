Number.prototype.toPercent = function () {
  return (this.valueOf() * 100).toFixed(0) + '%';
}

Number.prototype.toImg = function(strings) {
  var name = strings.civ.find(s => s.id === this.valueOf()).string;
  return '<img title="' + name + '" src="/img/' + name.toLowerCase() + '.png">';
}

getDateMonth = function(date) {
  return (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() < 10 ? '0' : '') + date.getMonth() + '.' + date.getFullYear().toString().slice(2,4);
}

$('document').ready(() => {
  $('body').append('<div id="options">');
  $('body').append('<div id="main">');
  var get_player_object = (match, get_enemy) => {
    var self = match.players.find(p => match.profile_id === p.profile_id);
    var enemy = match.players.find(p => match.profile_id !== p.profile_id);
    if (get_enemy) return enemy;
    return self;
  }
  $.get('https://www.aoe2.net/api/strings?game=aoe2de&lang=' + (navigator.language || navigator.userLanguage), async strings => {
    try {
      $('body').append('<div id="loading"></div>');
      var change_loading_symbol = () => {
        var $loading = $('#loading');
        if ($loading.length === 0) return;
        var txt = $loading.text();
        var count = txt.split('').filter(t => t === '.').length;
        var next = (count % 3) + 1;
        if (txt === '') next = 1;
        var points = '';
        for (var i = 0; i < next; i++) { points += '.'; }
        var newTxt = 'Fetching matches ' + points;
        $loading.text(newTxt);
        setTimeout(change_loading_symbol, 1000);
      }
      change_loading_symbol();
      strings = JSON.parse(strings);
      var m = new MatchManager();
      var urlParams = new URLSearchParams(window.location.search);
      var profile_id = urlParams.get('profileId');
      this.all_matches = (await m.getMatchHistory(profile_id));
      var $time_slider = $('<div id="time_slider" class="slider">');
      $time_slider.slider({
        range: true,
        min: 0,
        max: this.all_matches.length - 1,
        values: [0, this.all_matches.length - 1],
        slide: (event, ui) => {
          this.options.time.to = this.all_matches.array()[ui.values[0]].started;
          this.options.time.from = this.all_matches.array()[ui.values[1]].started;
          this.update_time_slider_values();
        }
      });
      $('#options').append('<div id="time_slider_values">');
      $('#options').append($time_slider);

      /*show stastics of this.matches*/

      var show_matches = () => {        
        this.options = JSON.parse(atob(window.location.hash.slice(1)));
        this.matches = m.get_filtered_match_list(this.all_matches, this.options);
        
        $('#main').empty();
        $('#main').append('<div>Games where you play:</div>');
        $('#main').append('<div>as: ' + (this.options.civ && this.options.civ.self ? this.options.civ.self.map(s => s.toImg(strings)).join('') : '-any civ-') + '</div>');
        $('#main').append('<div>against: ' + (this.options.civ && this.options.civ.opponent ? this.options.civ.opponent.map(s => s.toImg(strings)).join('') : '-any civ-') + '</div>');
        var civs = [];
        this.matches.array().forEach(m => {
          var current_civ = get_player_object(m, this.options.show_enemy_civ).civ;
          if (!civs[current_civ]) civs[current_civ] = [];
          civs[current_civ].push(m);
        });
        civs = civs.filter(c => c.length >= (this.options.min_matches_vs_civs || 0));
        var win_statistic = civs.map(c => {
          var wins = c.reduce((a,b) => a + (get_player_object(b).won ? 1 : 0), 0); //if you won then add one win
          return {
            civ:  get_player_object(c[0], this.options.show_enemy_civ).civ,
            matches: c.length,
            win_percentage: wins / c.length
          }
        }).sort((a, b) => b.win_percentage - a.win_percentage);

        $time_slider.slider.values = [
          this.all_matches.array().indexOf(this.all_matches.array().find(m => m.started === this.options.time.from)),
          this.all_matches.array().indexOf(this.all_matches.array().find(m => m.started === this.options.time.to))
        ];

        var avg_civ_wr = win_statistic.reduce((a,b) => a + b.win_percentage, 0) / win_statistic.length;
        var avg_wr = win_statistic.reduce((a,b) => a + b.matches * b.win_percentage, 0) / win_statistic.reduce((a,b) => a + b.matches, 0);

        $('#main').append('<div>Average winrate with civs: ' + avg_civ_wr.toPercent() + '</div>');
        $('#main').append('<div>Average winrate: ' + avg_wr.toPercent() + '</div>');

        if (!this.options.time) this.options.time = { to: this.matches.array()[0].started, from: this.matches.array()[this.matches.length - 1].started};
        this.update_time_slider_values = () => {
          $('#time_slider_values').text(
            getDateMonth(new Date(this.options.time.from))
            + ' - '
            + getDateMonth(new Date(this.options.time.to))
          );
          window.location.hash = btoa(JSON.stringify(this.options));
        }
        update_time_slider_values();

        $('#main').append(win_statistic.map(w =>
          '<table class="civ_wr_table" id="' + w.civ + '"><tr>'
          + '<td class="img">' + w.civ.toImg(strings) + '</td>'
          + '<td class="win_percentage ' + (w.win_percentage > 0.55 ? 'green' : (w.win_percentage > 0.5 ? 'yellow' : 'red')) + '">' + w.win_percentage.toPercent() + '</td>'
          + '<td class="amount_of_this.matches ' + (w.matches > 10 ? 'green' : (w.matches > 5 ? 'yellow' : 'red')) + '">(' + w.matches + ')</td>'
          + '</tr></table></div>')
        .join(''));

        $('.civ_wr_table').click(e=> {
          var civ = parseInt($(e.currentTarget).attr('id'));
          if (!this.options.civ) this.options.civ = { self: [], opponent: []}
          if (this.options.show_enemy_civ) {
            this.options.civ.opponent = [civ];
          } else {
            this.options.civ.self = [civ];
          }
          this.options.show_enemy_civ = !this.options.show_enemy_civ;
          window.location.hash = btoa(JSON.stringify(this.options));
        });
      }
      show_matches();
      window.onhashchange = show_matches;
    } catch (e) {
      $('body').append('Error (' + e + '). Please try again!');
    } finally {
      $('#loading').remove();
    }//$('body').append(this.matches.array().map(m => strings.civ[m.get_players()[0].get_civ()].string + ' vs ' + strings.civ[m.get_players()[1].get_civ()].string).join('<br>'));
  });
});