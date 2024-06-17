import numpy as np
from scipy import interpolate


def m4(lst_t, lst_cp, coef):
    # lst_t список списков температур
    # lst_t список списков теплоемкостей
    # coef список entaply of transition

    # Создаем интерполяционную функцию
    def interpolat(t, cp, ):
        _f = interpolate.interp1d(t, cp, kind='linear')

        return _f

    a = 0.000001

    # Энтальпия
    def h(t, a, f):

        # Вычисляем приближенный интеграл от функции f(x) методом трапеций
        return np.trapz([f(x) for x in np.arange(a, t, 0.01)], dx=0.00001)

    # Энтропия
    def s(t, a, f):

        return np.trapz([f(x) / (x) for x in np.arange(a, t, 0.01)], dx=0.01)

    # функция Гиббса
    def g(t, a, f):
        return h(t, a=a, f=f) - (t * s(t, a=a, f=f)) / 1000

    def _h(t, lst, coeff, k):

        if not k:
            return h(t, 0.000001, f=interpolat(lst_t[0], lst_cp[0]))
        else:
            return _h(lst[k - 1][-1], lst, coeff, k - 1) + coeff[k - 1] + h(t, a=lst[k][0],
                                                                            f=interpolat(lst_t[k], lst_cp[k]))

    def _s(t, lst, coeff, k):

        if not k:
            return s(t, a=0.000001, f=interpolat(lst_t[0], lst_cp[0]))
        else:
            return _s(lst[k - 1][-1], lst, coeff, k - 1) + (coeff[k - 1] / lst[k][0] * 1000) + s(t, lst[k][0],
                                                                                                 f=interpolat(lst_t[k],
                                                                                                              lst_cp[
                                                                                                                  k]))

    def _g(t, lst, coeff, k):
        return _h(t, lst, coeff, k) - (t * _s(t, lst, coeff, k)) / 1000

    lst_h = [[] for _ in range(len(lst_t))]
    lst_s = [[] for _ in range(len(lst_t))]
    lst_g = [[] for _ in range(len(lst_t))]

    for i in range(len(lst_t)):
        for j in range(len(lst_t[i])):
            lst_h[i].append(_h(lst_t[i][j], lst_t, coef, i))
            lst_s[i].append(_s(lst_t[i][j], lst_t, coef, i))
            lst_g[i].append(_g(lst_t[i][j], lst_t, coef, i))

    return lst_h, lst_s, lst_g




def extrapol(lst_t, lst_cp):
    if lst_t[0]==0.0:
        return lst_t, lst_cp, 0,0,0
    import numpy as np
    from scipy.optimize import curve_fit

    # Задаем функцию степенного вида
    def power_function(x, a, b):
        return a * np.power(x, b)

    params, covariance = curve_fit(power_function, lst_t[:6], lst_cp[:6])
    # Извлекаем параметры a и b
    a = params[0]
    b = params[1]
    prefix_t = [i for i in range(0, int(lst_t[0]))]
    prefix_cp = [round(power_function(i, a, b), 4) for i in prefix_t]

    err = round(np.mean(
        [(power_function(lst_t[i], a, b) - lst_cp[i]) ** 2 for i in range(6)]) / (
                            max(lst_cp[:6]) - min(lst_cp[:6])) * 100, 3)

    return prefix_t + lst_t, prefix_cp + lst_cp, a, b, err
