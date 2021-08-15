Number.prototype.toPercent = function () {
  return (this.valueOf() * 100).toFixed(0) + '%';
}

Number.prototype.toImg = function(strings) {
  var name = strings.civ.find(s => s.id === this.valueOf()).string;
  return '<img title="' + name + '" src="/img/' + name.toLowerCase() + '.png">';
}

getDateMonth = function(date) {
  return (date.getDate() < 10 ? '0' : '') + date.getDate() + '.' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '.' + date.getFullYear().toString().slice(2,4);
}

$('document').ready(async () => {
  $('body').append('<div id="advanced_options" class="hidden show_hide_div">');
	$('body').append('<div id="civ_selection_parent">');
  $('body').append('<div id="main">');
  var get_player_object = (match, get_enemy) => {
    var self = match.players.find(p => match.profile_id === p.profile_id);
    var enemy = match.players.find(p => match.profile_id !== p.profile_id);
    if (get_enemy) return enemy;
    return self;
  }
  $.get('https://www.aoe2.net/api/strings?game=aoe2de&lang=' + (navigator.language || navigator.userLanguage), async strings => {
    //strings = '{"language":"en","age":[{"id":0,"string":"Standard"},{"id":2,"string":"Dark Age"},{"id":3,"string":"Feudal Age"},{"id":4,"string":"Castle Age"},{"id":5,"string":"Imperial Age"},{"id":6,"string":"Post-Imperial Age"}],"civ":[{"id":1,"string":"Britons"},{"id":2,"string":"Franks"},{"id":3,"string":"Goths"},{"id":4,"string":"Teutons"},{"id":5,"string":"Japanese"},{"id":6,"string":"Chinese"},{"id":7,"string":"Byzantines"},{"id":8,"string":"Persians"},{"id":9,"string":"Saracens"},{"id":10,"string":"Turks"},{"id":11,"string":"Vikings"},{"id":12,"string":"Mongols"},{"id":13,"string":"Celts"},{"id":14,"string":"Spanish"},{"id":15,"string":"Aztecs"},{"id":16,"string":"Mayans"},{"id":17,"string":"Huns"},{"id":18,"string":"Koreans"},{"id":19,"string":"Italians"},{"id":20,"string":"Indians"},{"id":21,"string":"Incas"},{"id":22,"string":"Magyars"},{"id":23,"string":"Slavs"},{"id":24,"string":"Portuguese"},{"id":25,"string":"Ethiopians"},{"id":26,"string":"Malians"},{"id":27,"string":"Berbers"},{"id":28,"string":"Khmer"},{"id":29,"string":"Malay"},{"id":30,"string":"Burmese"},{"id":31,"string":"Vietnamese"},{"id":32,"string":"Bulgarians"},{"id":33,"string":"Tatars"},{"id":34,"string":"Cumans"},{"id":35,"string":"Lithuanians"},{"id":36,"string":"Burgundians"},{"id":37,"string":"Sicilians"},{"id":38,"string":"Poles"},{"id":39,"string":"Bohemians"}],"game_type":[{"id":0,"string":"Random Map"},{"id":1,"string":"Regicide"},{"id":2,"string":"Death Match"},{"id":3,"string":"Scenario"},{"id":6,"string":"King of the Hill"},{"id":7,"string":"Wonder Race"},{"id":8,"string":"Defend the Wonder"},{"id":9,"string":"Turbo Random Map"},{"id":10,"string":"Capture the Relic"},{"id":11,"string":"Sudden Death"},{"id":12,"string":"Battle Royale"},{"id":13,"string":"Empire Wars"},{"id":15,"string":"Co-Op Campaign"}],"leaderboard":[{"id":0,"string":"Unranked"},{"id":1,"string":"1v1 Death Match"},{"id":2,"string":"Team Death Match"},{"id":3,"string":"1v1 Random Map"},{"id":4,"string":"Team Random Map"},{"id":13,"string":"1v1 Empire Wars"},{"id":14,"string":"Team Empire Wars"}],"map_size":[{"id":0,"string":"Tiny (2 player)"},{"id":1,"string":"Small (3 player)"},{"id":2,"string":"Medium (4 player)"},{"id":3,"string":"Normal (6 player)"},{"id":4,"string":"Large (8 player)"},{"id":5,"string":"Giant"},{"id":6,"string":"Ludicrous"}],"map_type":[{"id":9,"string":"Arabia"},{"id":10,"string":"Archipelago"},{"id":11,"string":"Baltic"},{"id":12,"string":"Black Forest"},{"id":13,"string":"Coastal"},{"id":14,"string":"Continental"},{"id":15,"string":"Crater Lake"},{"id":16,"string":"Fortress"},{"id":17,"string":"Gold Rush"},{"id":18,"string":"Highland"},{"id":19,"string":"Islands"},{"id":20,"string":"Mediterranean"},{"id":21,"string":"Migration"},{"id":22,"string":"Rivers"},{"id":23,"string":"Team Islands"},{"id":24,"string":"Full Random"},{"id":25,"string":"Scandinavia"},{"id":26,"string":"Mongolia"},{"id":27,"string":"Yucatan"},{"id":28,"string":"Salt Marsh"},{"id":29,"string":"Arena"},{"id":31,"string":"Oasis"},{"id":32,"string":"Ghost Lake"},{"id":33,"string":"Nomad"},{"id":49,"string":"Iberia"},{"id":50,"string":"Britain"},{"id":51,"string":"Mideast"},{"id":52,"string":"Texas"},{"id":53,"string":"Italy"},{"id":54,"string":"Central America"},{"id":55,"string":"France"},{"id":56,"string":"Norse Lands"},{"id":57,"string":"Sea of Japan (East Sea)"},{"id":58,"string":"Byzantium"},{"id":59,"string":"Custom"},{"id":60,"string":"Random Land Map"},{"id":62,"string":"Random Real World Map"},{"id":63,"string":"Blind Random"},{"id":65,"string":"Random Special Map"},{"id":66,"string":"Random Special Map"},{"id":67,"string":"Acropolis"},{"id":68,"string":"Budapest"},{"id":69,"string":"Cenotes"},{"id":70,"string":"City of Lakes"},{"id":71,"string":"Golden Pit"},{"id":72,"string":"Hideout"},{"id":73,"string":"Hill Fort"},{"id":74,"string":"Lombardia"},{"id":75,"string":"Steppe"},{"id":76,"string":"Valley"},{"id":77,"string":"MegaRandom"},{"id":78,"string":"Hamburger"},{"id":79,"string":"CtR Random"},{"id":80,"string":"CtR Monsoon"},{"id":81,"string":"CtR Pyramid Descent"},{"id":82,"string":"CtR Spiral"},{"id":83,"string":"Kilimanjaro"},{"id":84,"string":"Mountain Pass"},{"id":85,"string":"Nile Delta"},{"id":86,"string":"Serengeti"},{"id":87,"string":"Socotra"},{"id":88,"string":"Amazon"},{"id":89,"string":"China"},{"id":90,"string":"Horn of Africa"},{"id":91,"string":"India"},{"id":92,"string":"Madagascar"},{"id":93,"string":"West Africa"},{"id":94,"string":"Bohemia"},{"id":95,"string":"Earth"},{"id":96,"string":"Canyons"},{"id":97,"string":"Enemy Archipelago"},{"id":98,"string":"Enemy Islands"},{"id":99,"string":"Far Out"},{"id":100,"string":"Front Line"},{"id":101,"string":"Inner Circle"},{"id":102,"string":"Motherland"},{"id":103,"string":"Open Plains"},{"id":104,"string":"Ring of Water"},{"id":105,"string":"Snakepit"},{"id":106,"string":"The Eye"},{"id":107,"string":"Australia"},{"id":108,"string":"Indochina"},{"id":109,"string":"Indonesia"},{"id":110,"string":"Strait of Malacca"},{"id":111,"string":"Philippines"},{"id":112,"string":"Bog Islands"},{"id":113,"string":"Mangrove Jungle"},{"id":114,"string":"Pacific Islands"},{"id":115,"string":"Sandbank"},{"id":116,"string":"Water Nomad"},{"id":117,"string":"Jungle Islands"},{"id":118,"string":"Holy Line"},{"id":119,"string":"Border Stones"},{"id":120,"string":"Yin Yang"},{"id":121,"string":"Jungle Lanes"},{"id":122,"string":"Alpine Lakes"},{"id":123,"string":"Bogland"},{"id":124,"string":"Mountain Ridge"},{"id":125,"string":"Ravines"},{"id":126,"string":"Wolf Hill"},{"id":132,"string":"Antarctica"},{"id":133,"string":"Aral Sea"},{"id":134,"string":"Black Sea"},{"id":135,"string":"Caucasus"},{"id":136,"string":"Caucasus"},{"id":137,"string":"Custom Map Pool"},{"id":138,"string":"Custom Map Pool"},{"id":139,"string":"Golden Swamp"},{"id":140,"string":"Four Lakes"},{"id":141,"string":"Land Nomad"},{"id":142,"string":"BR Battle On Ice"},{"id":143,"string":"BR El Dorado"},{"id":144,"string":"BR Fall of Axum"},{"id":145,"string":"BR Fall of Rome"},{"id":146,"string":"BR Majapahit Empire"},{"id":147,"string":"Amazon Tunnel"},{"id":148,"string":"Coastal Forest"},{"id":149,"string":"African Clearing"},{"id":150,"string":"Atacama"},{"id":151,"string":"Seize the Mountain"},{"id":152,"string":"Crater"},{"id":153,"string":"Crossroads"},{"id":154,"string":"Michi"},{"id":155,"string":"Team Moats"},{"id":156,"string":"Volcanic Island"},{"id":157,"string":"Acclivity"},{"id":158,"string":"Eruption"},{"id":159,"string":"Frigid Lake"},{"id":160,"string":"Greenland"},{"id":161,"string":"Lowland"},{"id":162,"string":"Marketplace"},{"id":163,"string":"Meadow"},{"id":164,"string":"Mountain Range"},{"id":165,"string":"Northern Isles"},{"id":166,"string":"Ring Fortress"},{"id":167,"string":"Runestones"}],"rating_type":[{"id":0,"string":"Unranked"},{"id":1,"string":"1v1 Death Match"},{"id":2,"string":"1v1 Random Map"},{"id":3,"string":"Team Death Match"},{"id":4,"string":"Team Random Map"},{"id":5,"string":"1v1 Random Map Quick Play"},{"id":6,"string":"Team Random Map Quick Play"},{"id":7,"string":"1v1 Empire Wars Quick Play"},{"id":8,"string":"Team Empire Wars Quick Play"},{"id":9,"string":"Battle Royale Quick Play"},{"id":13,"string":"1v1 Empire Wars"},{"id":14,"string":"Team Empire Wars"}],"resources":[{"id":0,"string":"Standard"},{"id":1,"string":"Low"},{"id":2,"string":"Medium"},{"id":3,"string":"High"},{"id":4,"string":"Ultra High"},{"id":5,"string":"Infinite"},{"id":6,"string":"Random"}],"speed":[{"id":0,"string":"Slow"},{"id":1,"string":"Casual"},{"id":2,"string":"Normal"},{"id":3,"string":"Fast"}],"victory":[{"id":1,"string":"Conquest"},{"id":7,"string":"Time Limit"},{"id":8,"string":"Score"},{"id":9,"string":"Standard"},{"id":11,"string":"Last Man Standing"}],"visibility":[{"id":0,"string":"Normal"},{"id":1,"string":"Explored"},{"id":2,"string":"All Visible"}]}';

    try {
      $('body').append('<div id="loading"></div>');
      this.update_options = () => {
        window.location.hash = btoa(JSON.stringify(this.options));
      }
      this.update_query = () => {
        window.location.search = '?profileId=' + $('#profile_id input').val();
      }
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
      var get_show_hide_option_div = (div_to_show_hide, show) => {
        var $close_option =  $('<div val="' + div_to_show_hide + '" class="close_options"><div class="arrow ' + (show ? 'opened' : '') + '">⮞</div><div>&nbsp;</div><div id="show_or_hide"><div class="' + (show ? 'not_seen' : '' ) + '">show</div><div class="' + (show ? '' : 'not_seen' ) + '">hide</div></div><div>&nbsp;' + div_to_show_hide.replace(/_/g, ' ') + '</div></div></div>');  
        $close_option.click(() => {
          $('#' + div_to_show_hide).toggleClass('hidden');
          $close_option.find('.arrow').toggleClass('opened');
          $close_option.find('#show_or_hide').children().toggleClass('not_seen');
        });
        return $close_option;
      }
      change_loading_symbol();
      strings = JSON.parse(strings);
      var m = new MatchManager();
      var urlParams = new URLSearchParams(window.location.search);
      var profile_id = urlParams.get('profileId');
      this.all_matches = (await m.getMatchHistory(profile_id, strings.civ));

      const slider_options = [{
        option_name: 'time',
        match_object_name: 'started',
        value_function: (from, to) => getDateMonth(new Date(from)) + ' - ' + getDateMonth(new Date(to))
      }, {
        option_name: 'duration',
        value_function: (from, to) => Math.round(from / 60) + 'min - ' + Math.round(to / 60) + 'min'
      }, {
        option_name: 'rating',
        value_function: (from, to) => from + ' - ' + to
      }];

      $('body').prepend(get_show_hide_option_div('advanced_options'));
      
      $('body').prepend('<div id="profile_id"><button title="Enter">Update!</button><input type="text" placeholder="player id"><span>name</span></div>');
      $('#profile_id input').val(profile_id);
      $('#profile_id span').text('(' + this.all_matches.array()[0].players.find(p => p.profile_id === parseInt(profile_id)).name + ')');
      $('#profile_id input').keydown(e => e.which === 13 ? this.update_query() : null);
      $('#profile_id button').click(() => this.update_query());
      
      slider_options.forEach(s => {
        $('#advanced_options').append('<div id="' + s.option_name + '_slider_values">');
        $('#advanced_options').append('<div id="' + s.option_name + '_slider" class="slider">');
      });

      /*show statistics of matches*/

      var show_matches = () => {        
        this.options = JSON.parse(atob(window.location.hash.slice(1)));
        this.matches = m.get_filtered_match_list(this.all_matches, this.options);
        
        $('#main').empty();
        $('#main').append($show_enemy_civ);

				if ($('#civ_selection').length === 0) {
					var all_civs = strings.civ.map(c => c.id);

					if (!this.options.civ) this.options.civ = {};
					if (!this.options.civ.self) this.options.civ.self = all_civs;
					if (!this.options.civ.opponent) this.options.civ.opponent = all_civs;

        	$('#civ_selection_parent').append(get_show_hide_option_div('civ_selection', true));
        	$('#civ_selection_parent').append('<div id="civ_selection" class="show_hide_div">');
					$('#civ_selection').append('<table>');
					$('#civ_selection table').append('<tr><td colspan=3>Games where you play:</td></tr>');
					$('#civ_selection table').append('<tr><th></th><th>as</th><th>against</th></tr>');
					$('#civ_selection table').append('<tr id="civs">');
					var $td = $('<td class="arrow_td"><div class="arrow">⮞</div></td>');
					$td.find('div').click(() => {
						$td.find('div').toggleClass('opened');
						$('#civs').toggleClass('opened');
					});
					$('#civ_selection table #civs').append($td);
					
					var $play_as_civ_selection = $('<td class="civ_selection right_border">');
					var $play_against_civ_selection = $('<td class="civ_selection left_border">');

					$('#civ_selection table #civs').append($play_as_civ_selection).append($play_against_civ_selection);

					[
						{ $obj: $play_as_civ_selection, str: 'self' },
						{ $obj: $play_against_civ_selection, str: 'opponent' }
					].forEach(o => {
						$select_all = $('<div class="select_all_none select_all">');
						$select_all.click(() => {
							this.options.civ[o.str] = all_civs;
							o.$obj.find('div:not(.select_all_none)').addClass('selected');
							this.update_options();
						}).css('background-image', 'url("img/all.png")').appendTo(o.$obj);
						
						$select_none = $('<div class="select_all_none select_none">');
						$select_none.click(() => {
							this.options.civ[o.str] = [];
							o.$obj.find('div:not(.select_all_none)').removeClass('selected');
							this.update_options();
						}).css('background-image', 'url("img/none.png")').attr('title', 'Unausgefüllte Checkbox Icon von Icons8').appendTo(o.$obj);
					});
					
					all_civs.forEach(c => {
						var $img = $(c.toImg(strings));
						[
							{ $push_into: $play_as_civ_selection, str: 'self' },
							{ $push_into: $play_against_civ_selection, str: 'opponent' }
						].forEach(o => {
							var $div = $('<div>').append($img.clone());
							if (this.options.civ[o.str].find(s => s === c)) $div.addClass('selected');
							o.$push_into.append($div);
							$div.click(() => {
								if (!$('#civs').hasClass('opened')) return;
								$div.toggleClass('selected');
								if (this.options.civ[o.str].find(s => s === c)) {
									this.options.civ[o.str] = this.options.civ[o.str].filter(s => s !== c);
								} else {
									this.options.civ[o.str].push(c);
								}
								this.update_options();
							});
						});
					});
				}

        /*sliders for different categories*/
        slider_options.forEach(c => {
          if (!c.match_object_name) c.match_object_name = c.option_name;
          var array = this.all_matches.array().map(m => m[c.match_object_name]).filter(m => typeof m === 'number').sort((a, b) => a - b);
          if (!this.options[c.option_name]
							|| this.options[c.option_name].from < array[0]
							|| this.options[c.option_name].to > array[array.length - 1]) {
						this.options[c.option_name] = {
							from: array[0],
							to: array[array.length - 1]
						};
					};

          update_slider_values = () => {
            $('#' + c.option_name + '_slider_values').text(c.value_function(this.options[c.option_name].from, this.options[c.option_name].to));
            this.update_options();
          }
          update_slider_values();

          var $slider = $('#' + c.option_name + '_slider');
          $slider.slider({
            range: true,
            min: array[0],
            max: array[array.length - 1],
            values: [
              this.options[c.option_name].from,
              this.options[c.option_name].to
            ],
            slide: (event, ui) => {
              this.options[c.option_name].from = ui.values[0];
              this.options[c.option_name].to = ui.values[1];
              update_slider_values();
            }
          });
        });

        /*match type*/
        if ($('#game-modes').length === 0) {
          if (!this.options.match_type) this.options.match_type = [];
          $('#advanced_options').append('<div id="game-modes">');
          [ 0, 1, 3, 13 ].forEach(gm => {
            var $button = $('<button id="' + gm + '">' + strings.leaderboard.find(l => l.id === gm).string + '</button>');
            $button.click(() => {
              $button.toggleClass('selected');
              if ($button.hasClass('selected')) {
                this.options.match_type.push(gm);
              } else {
                this.options.match_type = this.options.match_type.filter(mt => mt !== gm);
              }
              this.update_options();
            });
            if (this.options.match_type.find(mt => mt === gm)) $button.addClass('selected');
            $('#game-modes').append($button);
          });
        }

        /*civ selection*/
        if ($('#show_civ').length === 0) {
          var $show_enemy_civ = $('<div id="show_civ"><div class="sep">Show my winrate </div><div id="sep"><div class="show_civ" id="show_enemy_civ">vs</div><div class="show_civ" id="show_my_civ">with</div></div><div class="sep"> these civs.</div></div>');
          $show_enemy_civ.find('#show_my_civ').click(() => {
            this.options.show_enemy_civ = false;
            this.update_options();
          });
          $show_enemy_civ.find('#show_enemy_civ').click(() => {
            this.options.show_enemy_civ = true;
            this.update_options();
          });
          $show_enemy_civ.find(this.options.show_enemy_civ ? '#show_enemy_civ' : '#show_my_civ').addClass('selected');
          $('#advanced_options').append($show_enemy_civ);
        } else {
          $('#show_civ').find('.selected').removeClass('selected');
          $('#show_civ #show_' + (this.options.show_enemy_civ ? 'enemy' : 'my') + '_civ').addClass('selected');
        }
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

        var avg_civ_wr = win_statistic.reduce((a,b) => a + b.win_percentage, 0) / win_statistic.length;
        var avg_wr = win_statistic.reduce((a,b) => a + b.matches * b.win_percentage, 0) / win_statistic.reduce((a,b) => a + b.matches, 0);


        $('#main').append(get_show_hide_option_div('sample_info', true));
        $('#main').append('<div id="sample_info" class="show_hide_div">');
        $('#sample_info').append('<div">sample size: <b class="' + (this.matches.length > 100 ? 'green' : (this.matches.length > 10 ? 'yellow' : 'red')) + '">' + this.matches.length + '</b>');
        $('#sample_info').append('<div>Average winrate with civs: <b class="' + (avg_civ_wr > 0.55 ? 'green' : (avg_civ_wr > 0.5 ? 'yellow' : 'red')) + '">' + avg_civ_wr.toPercent() + '</b></div>');
        $('#sample_info').append('<div>Average winrate: <b class="' + (avg_wr > 0.55 ? 'green' : (avg_wr > 0.5 ? 'yellow' : 'red')) + '">' + avg_wr.toPercent() + '</b></div>');

        $('#main').append(win_statistic.map(w =>
          '<table class="civ_wr_table" id="' + w.civ + '"><tr>'
          + '<td class="img">' + w.civ.toImg(strings) + '</td>'
          + '<td class="win_percentage ' + (w.win_percentage > 0.55 ? 'green' : (w.win_percentage > 0.45 ? 'yellow' : 'red')) + '">' + w.win_percentage.toPercent() + '</td>'
          + '<td class="amount_of_matches ' + (w.matches > 10 ? 'green' : (w.matches > 5 ? 'yellow' : 'red')) + '">(' + w.matches + ')</td>'
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
		}
  });
});