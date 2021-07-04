class Player {
  constructor (json) {
    this.player = {};
    this.player.id = json.profile_id;
    this.player.name = json.name;
    this.player.rating = json.rating;
    this.player.civ = json.civ;
    this.player.won = json.won;
  }

  get_id() {
    return this.player.id;
  }

  get_name() {
    return this.player.name;
  }

  get_rating() {
    return this.player.rating;
  }

  get_civ() {
    return this.player.civ;
  }

  get_won() {
    return this.player.won;
  }
}