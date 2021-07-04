class Match {
  constructor (json, self) {
    this.match = {};
    this.match.average_rating = json.average_rating;
    this.match.map = json.map_type;
    this.match.match_type = json.rating_type;
    this.match.game_type = json.game_type;
    this.match.started_time = json.started;
    this.match.duration = json.finished - json.started;
    this.match.players = json.players.map(p => new Player(p)).sort((a,b) => a.get_id() === self ? -1 : 1);
  }

  get_map() {
    return this.map;
  }

  get_average_rating() {
    return this.match.average_rating;
  }
  
  get_game_type() {
    return this.match.game_type;
  }
  
  get_match_type() {
    return this.match.match_type;
  }
  
  get_started_time() {
    return this.match.started_time;
  }
  
  get_duration() {
    return this.match.duration;
  }
  
  get_players() {
    return this.match.players;
  }
}