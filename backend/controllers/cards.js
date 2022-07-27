const BadRequestError = require('../utils/BadRequestError');
const ForbiddenError = require('../utils/ForbiddenError');
const NotFoundError = require('../utils/NotFoundError');
const InternalError = require('../utils/InternalError');
const Card = require('../models/card');

const prepareCardResponse = (card) => ({
  _id: card._id,
  name: card.name,
  link: card.link,
  owner: card.owner,
  likes: card.likes,
  createdAt: card.createdAt,
});

const getCards = async (_, res, next) => {
  try {
    const cards = await Card.find({});

    const preparedCards = cards.map(prepareCardResponse);

    return res.send(preparedCards);
  } catch (error) {
    return next(error);
  }
};

const getCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).orFail(
      () => new NotFoundError(`Карточка с таким _id ${cardId} не найдена`),
    );

    return res.send(prepareCardResponse(card));
  } catch (error) {
    return next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user._id });

    return res.send(prepareCardResponse(card));
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }

    return next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).orFail(
      () => new NotFoundError(`Карточка с _id ${cardId} не найдена`),
    );

    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Вы не можете удалить чужие карточки');
    }

    const deletedCard = await Card.findByIdAndDelete(card._id).orFail(
      () => new InternalError('Ошибка при удалении'),
    );

    return res.send({
      data: prepareCardResponse(deletedCard),
      message: 'Карточка успешно удалена',
    });
  } catch (error) {
    return next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError(`Карточка с _id ${cardId} не найдена`));

    return res.send({
      data: prepareCardResponse(card),
      message: 'Лайк успешно поставлен',
    });
  } catch (error) {
    return next(error);
  }
};

const unlikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError(`Карточка с _id ${cardId} не найдена`));

    return res.send({
      data: prepareCardResponse(card),
      message: 'Лайк успешно удален',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCard,
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
