
module.exports = {
  template: require('./npcCardTemplate.html'),
  props: {
    npc: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      defaultsTo: false
    }
  },
  data() {
    return {
      favorite: this.isFavorite
    };
  },
  methods: {
    setFavorite() {
      this.$emit('favorite', !this.favorite);
    },
    editNpc() {
      this.$emit('edit');
    },
    deleteNpc() {
      this.$emit('delete');
    }
  }
};
